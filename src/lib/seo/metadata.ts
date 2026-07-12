import type { Metadata } from "next";

import { siteUrl } from "@/lib/sanity/env";

interface BuildMetadataInput {
  title: string;
  description: string;
  path?: string;
  titleTemplate?: string;
  ogImageUrl?: string;
}

export function buildMetadata({
  title,
  description,
  path = "/",
  titleTemplate,
  ogImageUrl,
}: BuildMetadataInput): Metadata {
  const canonicalUrl = new URL(path, siteUrl).toString();

  return {
    title: titleTemplate ? { default: title, template: titleTemplate } : title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: title,
      type: "website",
      ...(ogImageUrl ? { images: [{ url: ogImageUrl }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ogImageUrl ? { images: [ogImageUrl] } : {}),
    },
  };
}
