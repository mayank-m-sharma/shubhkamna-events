import { siteUrl } from "@/lib/sanity/env";

interface OrganizationJsonLdInput {
  name: string;
  description: string;
}

export function buildOrganizationJsonLd({
  name,
  description,
}: OrganizationJsonLdInput): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    description,
    url: siteUrl,
  };
}
