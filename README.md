# DATX

Digital Assets Treasury Platform is a static institutional-style website built
with Next.js App Router and Tailwind CSS.

## Local Development

```bash
npm install
npm run dev
```

Build verification:

```bash
npm run build
```

Sample report PDFs are committed under `public/reports/`. To regenerate the
illustrative report files:

```bash
npm run reports:generate
```

## Vercel Deployment

This repository uses standard Next.js conventions and requires no environment
variables or backend services for deployment. The project targets Node.js
`22.x` for consistent Vercel builds.

1. Import the Git repository into Vercel.
2. Leave the detected framework as `Next.js`.
3. Use the default install command (`npm install`) and build command
   (`npm run build`).
4. Deploy from the production branch selected for the project.

The site is fully static at build time. Local `.vercel` project-link metadata
and local environment override files are excluded from version control.
