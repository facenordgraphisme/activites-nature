import { getLocale, getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/sections/page-header";
import { DeparturesCalendar, type DepartureView } from "@/components/sections/departures-calendar";
import { Container } from "@/components/ui/container";
import {
  getActivities,
  getDeparturesPage,
  getUpcomingDepartures,
  pick,
  type Locale,
} from "@/sanity/lib/content";

export async function generateMetadata() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("departures");
  const departuresPage = await getDeparturesPage();
  return { title: pick(departuresPage?.title, locale) ?? t("title") };
}

export default async function DeparturesPage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("departures");
  const [departuresPage, departures, activities] = await Promise.all([
    getDeparturesPage(),
    getUpcomingDepartures(),
    getActivities(),
  ]);

  const activityTitle = (type: "rafting" | "canyoning") =>
    pick(activities?.find((a) => a.type === type)?.title, locale) ?? type;

  const views: DepartureView[] = (departures ?? [])
    .filter((d) => d.status !== "cancelled")
    .map((d) => ({
      id: d._id,
      activityType: d.activityType,
      title: d.itinerary?.name ?? activityTitle(d.activityType),
      startISO: d.startDateTime,
      duration: d.duration,
      capacity: d.capacity,
      price: d.price,
      status: d.status ?? "open",
      bookingUrl: d.bookingUrl,
    }));

  return (
    <>
      <PageHeader
        eyebrow={pick(departuresPage?.eyebrow, locale) ?? t("eyebrow")}
        title={pick(departuresPage?.title, locale) ?? t("title")}
        subtitle={pick(departuresPage?.subtitle, locale) ?? t("subtitle")}
      />

      <section className="py-24">
        <Container>
          <DeparturesCalendar
            departures={views}
            emptyMessage={pick(departuresPage?.emptyMessage, locale) ?? t("emptyMessage")}
            noBookingLinkLabel={pick(departuresPage?.noBookingLinkMessage, locale) ?? t("noBookingLink")}
          />
        </Container>
      </section>
    </>
  );
}
