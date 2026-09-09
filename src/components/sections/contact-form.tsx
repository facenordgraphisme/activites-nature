"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Send } from "lucide-react";
import { business } from "@/lib/business-data";

export function ContactForm() {
  const t = useTranslations("contact.form");
  const tActivities = useTranslations("activities");
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "");
    const email = String(form.get("email") ?? "");
    const phone = String(form.get("phone") ?? "");
    const activity = String(form.get("activity") ?? "");
    const message = String(form.get("message") ?? "");

    const body = [
      `${t("name")}: ${name}`,
      `${t("email")}: ${email}`,
      `${t("phone")}: ${phone}`,
      `${t("activity")}: ${activity}`,
      "",
      message,
    ].join("\n");

    const mailto = `mailto:${business.email}?subject=${encodeURIComponent(
      `${t("activity")} — ${activity}`,
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
    setSent(true);
  }

  const activityOptions = [
    tActivities("rafting.title"),
    tActivities("canyoning.title"),
  ];

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={t("name")} name="name" required />
        <Field label={t("email")} name="email" type="email" required />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={t("phone")} name="phone" type="tel" />
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink">
            {t("activity")}
          </label>
          <select
            name="activity"
            className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-ink outline-none transition-colors duration-200 ease-out focus:border-ink"
          >
            {activityOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink">
          {t("message")}
        </label>
        <textarea
          name="message"
          rows={5}
          className="w-full resize-none rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-ink outline-none transition-colors duration-200 ease-out focus:border-ink"
        />
      </div>

      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 self-start rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper transition-transform duration-200 ease-out hover:scale-[1.03] active:scale-[0.97]"
      >
        <Send size={16} />
        {t("submit")}
      </button>

      {sent && (
        <p className="text-sm text-ink-soft" role="status">
          {t("success")}
        </p>
      )}
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-ink">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-ink outline-none transition-colors duration-200 ease-out focus:border-ink"
      />
    </div>
  );
}
