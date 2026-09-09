import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { MotionConfig } from "motion/react";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "../globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    title: {
      default: t("siteName"),
      template: t("titleTemplate"),
    },
    description: t("defaultDescription"),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  return (
    <html
      lang={locale}
      className={`${spaceGrotesk.variable} ${inter.variable} antialiased`}
    >
      <body className="flex min-h-screen flex-col bg-paper text-ink">
        <NextIntlClientProvider>
          <MotionConfig reducedMotion="user">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </MotionConfig>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
