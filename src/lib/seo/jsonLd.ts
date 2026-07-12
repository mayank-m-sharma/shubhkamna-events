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
