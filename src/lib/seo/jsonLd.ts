import { siteUrl } from "@/lib/sanity/env";

interface OrganizationJsonLdInput {
  name: string;
  description: string;
  legalName?: string;
  address?: string;
  phone?: string;
  logoUrl?: string;
  sameAs?: string[];
}

export function buildOrganizationJsonLd({
  name,
  description,
  legalName,
  address,
  phone,
  logoUrl,
  sameAs,
}: OrganizationJsonLdInput): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    description,
    url: siteUrl,
    ...(legalName ? { legalName } : {}),
    ...(address ? { address } : {}),
    ...(phone ? { telephone: phone } : {}),
    ...(logoUrl ? { logo: logoUrl } : {}),
    ...(sameAs && sameAs.length > 0 ? { sameAs } : {}),
  };
}

interface ServiceJsonLdInput {
  name: string;
  description: string;
  url: string;
  providerName: string;
  imageUrl?: string;
}

export function buildServiceJsonLd({
  name,
  description,
  url,
  providerName,
  imageUrl,
}: ServiceJsonLdInput): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: name,
    name,
    description,
    url,
    provider: {
      "@type": "Organization",
      name: providerName,
    },
    ...(imageUrl ? { image: imageUrl } : {}),
  };
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function buildBreadcrumbJsonLd(
  items: BreadcrumbItem[],
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

interface ContactPageJsonLdInput {
  url: string;
  organizationName: string;
  organizationAddress?: string;
  organizationPhone?: string;
}

// Nests a LocalBusiness `mainEntity` rather than a second top-level
// Organization block — the root layout already renders one Organization
// JSON-LD sitewide (SHU-003); duplicating it per-page would be redundant.
export function buildContactPageJsonLd({
  url,
  organizationName,
  organizationAddress,
  organizationPhone,
}: ContactPageJsonLdInput): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    url,
    mainEntity: {
      "@type": "LocalBusiness",
      name: organizationName,
      ...(organizationAddress ? { address: organizationAddress } : {}),
      ...(organizationPhone ? { telephone: organizationPhone } : {}),
    },
  };
}
