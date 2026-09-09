import { Container } from "@/components/ui/container";

export function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="border-b border-border bg-surface-muted py-16 sm:py-20">
      <Container className="text-center">
        {eyebrow && (
          <p className="text-sm font-semibold uppercase tracking-wider text-ink-soft">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">
            {subtitle}
          </p>
        )}
      </Container>
    </section>
  );
}
