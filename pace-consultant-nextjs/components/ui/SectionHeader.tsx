interface SectionHeaderProps {
  label: string;
  title: string;
  subtitle?: string;
  titleId?: string;
}

export function SectionHeader({ label, title, subtitle, titleId }: SectionHeaderProps) {
  return (
    <header className="mx-auto mb-12 max-w-2xl text-center">
      <p className="mb-2 font-heading text-sm font-semibold uppercase tracking-[0.15em] text-secondary">
        {label}
      </p>
      <h2
        id={titleId}
        className="font-heading text-3xl font-bold text-primary md:text-4xl text-balance"
      >
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-4 text-base leading-relaxed text-muted">{subtitle}</p>
      ) : null}
    </header>
  );
}
