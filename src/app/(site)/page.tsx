import type { Metadata } from "next";
import type { ReactNode } from "react";

import { ComingSoonHero } from "@/components/organisms/ComingSoonHero";
import { PageBuilder } from "@/components/PageBuilder";
import { getHomePage } from "@/lib/sanity/getHomePage";
import { getSiteSettings } from "@/lib/sanity/getSiteSettings";
import { buildMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings();

  return buildMetadata({
    title: siteSettings.seoTitle,
    description: siteSettings.seoDescription,
    path: "/",
  });
}

export default async function HomePage(): Promise<ReactNode> {
  const [siteSettings, homePage] = await Promise.all([
    getSiteSettings(),
    getHomePage(),
  ]);

  // No published/valid homePage document yet — same placeholder SHU-001
  // always showed, now also the graceful-degradation fallback rather than
  // a dead end.
  if (!homePage) {
    return (
      <ComingSoonHero
        tagline={siteSettings.tagline}
        headline={siteSettings.comingSoonHeadline}
        message={siteSettings.comingSoonMessage}
      />
    );
  }

  return (
    <PageBuilder
      sections={homePage.sections}
      extras={{
        reviewRating: siteSettings.reviewRating,
        reviewCount: siteSettings.reviewCount,
        reviewUrl: siteSettings.reviewUrl,
        organizationPhone: siteSettings.organizationPhone,
        whatsappNumber: siteSettings.whatsappNumber,
      }}
    />
  );
}
