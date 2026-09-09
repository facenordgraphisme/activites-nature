import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <Container className="flex min-h-[50vh] flex-col items-center justify-center gap-4 py-24 text-center">
      <h1 className="font-display text-3xl font-semibold text-ink">{t("title")}</h1>
      <p className="text-ink-soft">{t("body")}</p>
      <Button href="/">{t("cta")}</Button>
    </Container>
  );
}
