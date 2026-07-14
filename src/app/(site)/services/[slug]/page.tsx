import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { JsonLd } from "@/components/atoms/JsonLd";
import { ServiceDetail } from "@/components/organisms/ServiceDetail";
import { siteUrl } from "@/lib/sanity/env";
import { getServiceBySlug } from "@/lib/sanity/getServiceBySlug";
import { getServiceSlugs } from "@/lib/sanity/getServiceSlugs";
import { getSiteSettings } from "@/lib/sanity/getSiteSettings";
import { urlFor } from "@/lib/sanity/image";
import { buildBreadcrumbJsonLd, buildServiceJsonLd } from "@/lib/seo/jsonLd";
import { buildMetadata } from "@/lib/seo/metadata";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const slugs = await getServiceSlugs();

  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    return { title: "Service not found" };
  }

  return buildMetadata({
    title: `${service.title} | Shubhkamna Events`,
    description: service.description,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({
  params,
}: ServicePageProps): Promise<ReactNode> {
  const { slug } = await params;
  const [service, siteSettings] = await Promise.all([
    getServiceBySlug(slug),
    getSiteSettings(),
  ]);

  if (!service) {
    notFound();
  }

  const serviceUrl = new URL(`/services/${service.slug}`, siteUrl).toString();

  return (
    <>
      <JsonLd
        data={buildServiceJsonLd({
          name: service.title,
          description: service.description,
          url: serviceUrl,
          providerName: siteSettings.siteName,
          imageUrl: urlFor(service.image).width(1200).url(),
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", url: siteUrl },
          { name: "Services", url: new URL("/services", siteUrl).toString() },
          { name: service.title, url: serviceUrl },
        ])}
      />
      <ServiceDetail
        title={service.title}
        description={service.description}
        image={service.image}
        imageAlt={service.imageAlt}
        features={service.features}
        gallery={service.gallery}
        ctaLabel={service.ctaLabel}
        ctaHref={service.ctaHref}
      />
    </>
  );
}
