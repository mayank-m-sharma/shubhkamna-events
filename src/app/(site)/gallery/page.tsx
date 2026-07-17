import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { JsonLd } from "@/components/atoms/JsonLd";
import { Gallery } from "@/components/organisms/Gallery";
import { siteUrl } from "@/lib/sanity/env";
import { getGalleryPage } from "@/lib/sanity/getGalleryPage";
import { buildBreadcrumbJsonLd } from "@/lib/seo/jsonLd";
import { buildMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const galleryPage = await getGalleryPage();

  if (!galleryPage) {
    return { title: "Gallery not found" };
  }

  return buildMetadata({
    title: `${galleryPage.heading} | Shubhkamna Events`,
    description:
      galleryPage.intro ??
      "Browse Shubhkamna Events' full portfolio of weddings, corporate events, and celebrations across Indore.",
    path: "/gallery",
  });
}

export default async function GalleryPage(): Promise<ReactNode> {
  const galleryPage = await getGalleryPage();

  if (!galleryPage) {
    notFound();
  }

  const galleryUrl = new URL("/gallery", siteUrl).toString();

  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", url: siteUrl },
          { name: galleryPage.heading, url: galleryUrl },
        ])}
      />
      <Gallery
        heading={galleryPage.heading}
        intro={galleryPage.intro}
        images={galleryPage.images}
      />
    </>
  );
}
