import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import type { ReactNode } from "react";

import { JsonLd } from "@/components/atoms/JsonLd";
import { siteUrl } from "@/lib/sanity/env";
import { getSiteSettings } from "@/lib/sanity/getSiteSettings";
import { buildOrganizationJsonLd } from "@/lib/seo/jsonLd";

import "./globals.scss";

// Interim default font pair, loaded at build time via next/font (no runtime
// request, no layout shift). SHU-002 replaces this with CMS-selected font
// families, swapped in via the same `--font-heading-fallback` /
// `--font-body-fallback` CSS custom properties consumed by src/styles/_tokens.scss.
const headingFont = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading-fallback",
  display: "swap",
});

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body-fallback",
  display: "swap",
});

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
    <html lang="en" className={`${headingFont.variable} ${bodyFont.variable}`}>
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
        <main id="main-content">{children}</main>
      </body>
    </html>
  );
}
