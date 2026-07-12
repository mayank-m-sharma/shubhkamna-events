import type { Metadata } from "next";
import type { ReactNode } from "react";

import { ComingSoonHero } from "@/components/organisms/ComingSoonHero";
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
  const siteSettings = await getSiteSettings();

  return (
    <ComingSoonHero
      tagline={siteSettings.tagline}
      headline={siteSettings.comingSoonHeadline}
      message={siteSettings.comingSoonMessage}
    />
  );
}
