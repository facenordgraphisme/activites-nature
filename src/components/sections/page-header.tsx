import { Container } from "@/components/ui/container";
import { RevealLine } from "@/components/ui/reveal";

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
    <section className="bg-grain relative overflow-hidden rounded-b-[2.5rem] bg-surface-dark py-20 text-white sm:py-28">
      <Container className="relative z-10 text-center">
        {eyebrow && (
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--brand)]" />
            {eyebrow}
          </p>
        )}
        <h1 className="mt-3 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
          <RevealLine>{title}</RevealLine>
        </h1>
        {subtitle && (
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg">
            {subtitle}
          </p>
        )}
      </Container>
    </section>
  );
}
