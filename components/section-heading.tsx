type SectionHeadingProps = {
  label: string;
  title: string;
  description?: string;
  centered?: boolean;
};

export function SectionHeading({
  label,
  title,
  description,
  centered = false,
}: SectionHeadingProps) {
  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="eyebrow">{label}</p>
      <h2 className="mt-5 text-3xl font-light tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      {description ? <p className="body-copy mt-6">{description}</p> : null}
    </div>
  );
}
