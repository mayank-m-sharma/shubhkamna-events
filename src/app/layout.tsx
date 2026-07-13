import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { JsonLd } from "@/components/atoms/JsonLd";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { siteUrl } from "@/lib/sanity/env";
import { getSiteSettings } from "@/lib/sanity/getSiteSettings";
import { urlFor } from "@/lib/sanity/image";
import { buildOrganizationJsonLd } from "@/lib/seo/jsonLd";
import { buildMetadata } from "@/lib/seo/metadata";
import { getFontClassName } from "@/lib/theme/fonts";

import "./globals.scss";

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings();
  const ogImageUrl = siteSettings.ogImage
    ? urlFor(siteSettings.ogImage).width(1200).height(630).url()
    : undefined;

  return {
    ...buildMetadata({
      title: siteSettings.seoTitle,
      description: siteSettings.seoDescription,
      titleTemplate: `%s | ${siteSettings.siteName}`,
      ogImageUrl,
    }),
    metadataBase: new URL(siteUrl),
    ...(siteSettings.favicon
      ? {
          icons: {
            icon: urlFor(siteSettings.favicon).width(32).height(32).url(),
          },
        }
      : {}),
  };
}

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
        <JsonLd
          data={buildOrganizationJsonLd({
            name: siteSettings.siteName,
            description: siteSettings.tagline,
            legalName: siteSettings.organizationLegalName,
            address: siteSettings.organizationAddress,
            phone: siteSettings.organizationPhone,
            logoUrl: siteSettings.logo
              ? urlFor(siteSettings.logo).width(512).url()
              : undefined,
            sameAs: siteSettings.socialLinks.map((link) => link.url),
          })}
        />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
