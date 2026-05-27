import { mkdir, readFile, writeFile } from "node:fs/promises";
import { basename, dirname, join } from "node:path";
import { deflateSync, inflateSync } from "node:zlib";

const sourcePath = process.argv[2];

if (!sourcePath) {
  throw new Error(
    "Usage: node scripts/prepare-brand-assets.mjs <path-to-source-logo.png>",
  );
}

const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

function paeth(left, above, upperLeft) {
  const prediction = left + above - upperLeft;
  const leftDistance = Math.abs(prediction - left);
  const aboveDistance = Math.abs(prediction - above);
  const upperLeftDistance = Math.abs(prediction - upperLeft);

  if (leftDistance <= aboveDistance && leftDistance <= upperLeftDistance) {
    return left;
  }

  return aboveDistance <= upperLeftDistance ? above : upperLeft;
}

function decodePng(buffer) {
  if (!buffer.subarray(0, signature.length).equals(signature)) {
    throw new Error("The source logo must be a PNG image.");
  }

  const chunks = [];
  let width;
  let height;
  let colorType;
  let offset = signature.length;

  while (offset < buffer.length) {
    const length = buffer.readUInt32BE(offset);
    const type = buffer.toString("ascii", offset + 4, offset + 8);
    const data = buffer.subarray(offset + 8, offset + 8 + length);

    if (type === "IHDR") {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      colorType = data[9];
    }

    if (type === "IDAT") {
      chunks.push(data);
    }

    offset += length + 12;
  }

  if (colorType !== 6) {
    throw new Error("The source logo must be an RGBA PNG image.");
  }

  const bytesPerPixel = 4;
  const stride = width * bytesPerPixel;
  const inflated = inflateSync(Buffer.concat(chunks));
  const pixels = Buffer.alloc(width * height * bytesPerPixel);
  let previousRow = Buffer.alloc(stride);
  let readOffset = 0;

  for (let y = 0; y < height; y += 1) {
    const filter = inflated[readOffset];
    const scanline = inflated.subarray(readOffset + 1, readOffset + 1 + stride);
    const row = Buffer.alloc(stride);

    for (let index = 0; index < stride; index += 1) {
      const left = index >= bytesPerPixel ? row[index - bytesPerPixel] : 0;
      const above = previousRow[index];
      const upperLeft =
        index >= bytesPerPixel ? previousRow[index - bytesPerPixel] : 0;
      let value = scanline[index];

      if (filter === 1) {
        value += left;
      } else if (filter === 2) {
        value += above;
      } else if (filter === 3) {
        value += Math.floor((left + above) / 2);
      } else if (filter === 4) {
        value += paeth(left, above, upperLeft);
      }

      row[index] = value & 255;
    }

    row.copy(pixels, y * stride);
    previousRow = row;
    readOffset += stride + 1;
  }

  return { width, height, pixels };
}

function crc32(buffer) {
  let crc = 0xffffffff;

  for (const byte of buffer) {
    crc ^= byte;

    for (let bit = 0; bit < 8; bit += 1) {
      crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
    }
  }

  return (crc ^ 0xffffffff) >>> 0;
}

function pngChunk(type, data) {
  const typeBuffer = Buffer.from(type);
  const crcBuffer = Buffer.alloc(4);
  crcBuffer.writeUInt32BE(crc32(Buffer.concat([typeBuffer, data])));
  const lengthBuffer = Buffer.alloc(4);
  lengthBuffer.writeUInt32BE(data.length);
  return Buffer.concat([lengthBuffer, typeBuffer, data, crcBuffer]);
}

function encodePng({ width, height, pixels }) {
  const header = Buffer.alloc(13);
  header.writeUInt32BE(width, 0);
  header.writeUInt32BE(height, 4);
  header[8] = 8;
  header[9] = 6;

  const stride = width * 4;
  const scanlines = Buffer.alloc(height * (stride + 1));

  for (let y = 0; y < height; y += 1) {
    pixels.copy(scanlines, y * (stride + 1) + 1, y * stride, (y + 1) * stride);
  }

  return Buffer.concat([
    signature,
    pngChunk("IHDR", header),
    pngChunk("IDAT", deflateSync(scanlines, { level: 9 })),
    pngChunk("IEND", Buffer.alloc(0)),
  ]);
}

function extractWhiteArtwork(source) {
  const { width, height, pixels } = source;
  const extracted = Buffer.alloc(pixels.length);
  const bounds = { left: width, top: height, right: 0, bottom: 0 };

  for (let index = 0; index < pixels.length; index += 4) {
    const luminance =
      pixels[index] * 0.2126 +
      pixels[index + 1] * 0.7152 +
      pixels[index + 2] * 0.0722;
    const alpha = Math.max(
      0,
      Math.min(255, Math.round(((luminance - 80) / 165) * 255)),
    );
    const pixel = index / 4;
    const x = pixel % width;
    const y = Math.floor(pixel / width);

    extracted[index] = 255;
    extracted[index + 1] = 255;
    extracted[index + 2] = 255;
    extracted[index + 3] = alpha;

    if (alpha > 4) {
      bounds.left = Math.min(bounds.left, x);
      bounds.top = Math.min(bounds.top, y);
      bounds.right = Math.max(bounds.right, x);
      bounds.bottom = Math.max(bounds.bottom, y);
    }
  }

  return { width, height, pixels: extracted, bounds };
}

function crop(source, bounds, padding = 0) {
  const left = Math.max(0, bounds.left - padding);
  const top = Math.max(0, bounds.top - padding);
  const right = Math.min(source.width - 1, bounds.right + padding);
  const bottom = Math.min(source.height - 1, bounds.bottom + padding);
  const width = right - left + 1;
  const height = bottom - top + 1;
  const pixels = Buffer.alloc(width * height * 4);

  for (let y = 0; y < height; y += 1) {
    const sourceStart = ((top + y) * source.width + left) * 4;
    const destinationStart = y * width * 4;
    source.pixels.copy(
      pixels,
      destinationStart,
      sourceStart,
      sourceStart + width * 4,
    );
  }

  return { width, height, pixels };
}

function createIcon(artwork, markBounds, size = 256) {
  const background = [9, 19, 31, 255];
  const pixels = Buffer.alloc(size * size * 4);

  for (let index = 0; index < pixels.length; index += 4) {
    pixels[index] = background[0];
    pixels[index + 1] = background[1];
    pixels[index + 2] = background[2];
    pixels[index + 3] = background[3];
  }

  const mark = crop(artwork, markBounds, 2);
  const scale = Math.min(0.68 * size / mark.width, 0.68 * size / mark.height);
  const targetWidth = Math.round(mark.width * scale);
  const targetHeight = Math.round(mark.height * scale);
  const targetLeft = Math.round((size - targetWidth) / 2);
  const targetTop = Math.round((size - targetHeight) / 2);

  for (let y = 0; y < targetHeight; y += 1) {
    for (let x = 0; x < targetWidth; x += 1) {
      const sourceX = Math.min(mark.width - 1, Math.floor(x / scale));
      const sourceY = Math.min(mark.height - 1, Math.floor(y / scale));
      const sourceIndex = (sourceY * mark.width + sourceX) * 4;
      const destinationIndex = ((targetTop + y) * size + targetLeft + x) * 4;
      const alpha = mark.pixels[sourceIndex + 3] / 255;

      for (let channel = 0; channel < 3; channel += 1) {
        pixels[destinationIndex + channel] = Math.round(
          mark.pixels[sourceIndex + channel] * alpha +
            background[channel] * (1 - alpha),
        );
      }
    }
  }

  return { width: size, height: size, pixels };
}

const source = decodePng(await readFile(sourcePath));
const extracted = extractWhiteArtwork(source);
const logo = crop(extracted, extracted.bounds, 10);
const markBounds = {
  left: extracted.bounds.left,
  top: extracted.bounds.top,
  right: Math.round(source.width * 0.27),
  bottom: extracted.bounds.bottom,
};
const icon = createIcon(extracted, markBounds);
const logoPath = join("public", "brand", "datx-logo-white.png");
const iconPath = join("app", "icon.png");

await mkdir(dirname(logoPath), { recursive: true });
await writeFile(logoPath, encodePng(logo));
await writeFile(iconPath, encodePng(icon));

console.log(
  `Prepared ${basename(logoPath)} (${logo.width}x${logo.height}) and ${basename(iconPath)} (${icon.width}x${icon.height}).`,
);
