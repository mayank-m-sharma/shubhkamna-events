import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Services } from "@/components/organisms/Services";
import { getServices } from "@/lib/sanity/getServices";
import { buildMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Our Services | Shubhkamna Events",
    description:
      "Explore Shubhkamna Events' full catalog of event planning services — weddings, corporate events, social celebrations, decor, entertainment, and special events across Indore.",
    path: "/services",
  });
}

export default async function ServicesIndexPage(): Promise<ReactNode> {
  const services = await getServices();

  return (
    <Services
      heading="Our Services"
      intro="From intimate celebrations to large-scale professional events, explore our full range of event planning services."
      items={services.map((service) => ({
        icon: service.icon,
        title: service.title,
        description: service.description,
        href: `/services/${service.slug}`,
      }))}
    />
  );
}
