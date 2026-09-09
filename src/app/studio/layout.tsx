import type { ReactNode } from "react";

export const metadata = { title: "Studio — Activités Nature" };

export default function StudioLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
