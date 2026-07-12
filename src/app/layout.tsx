import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { JsonLd } from "@/components/atoms/JsonLd";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { siteUrl } from "@/lib/sanity/env";
import { getSiteSettings } from "@/lib/sanity/getSiteSettings";
import { buildOrganizationJsonLd } from "@/lib/seo/jsonLd";
import { getFontClassName } from "@/lib/theme/fonts";

import "./globals.scss";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Shubhkamna Events",
    template: "%s | Shubhkamna Events",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}): Promise<ReactNode> {
  const siteSettings = await getSiteSettings();

  return (
    <html lang="en" className={getFontClassName()}>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <JsonLd
          data={buildOrganizationJsonLd({
            name: siteSettings.siteName,
            description: siteSettings.tagline,
          })}
        />
        <ThemeProvider>
          <main id="main-content">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
