import type { Metadata } from "next";
import type { ReactNode } from "react";

import { CtaBanner } from "@/components/organisms/CtaBanner";
import { FAQ } from "@/components/organisms/FAQ";
import { PageHero } from "@/components/organisms/PageHero";
import { Process } from "@/components/organisms/Process";
import { Services } from "@/components/organisms/Services";
import { getServices } from "@/lib/sanity/getServices";
import { getServicesPage } from "@/lib/sanity/getServicesPage";
import { getSiteSettings } from "@/lib/sanity/getSiteSettings";
import { buildMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const servicesPage = await getServicesPage();

  return buildMetadata({
    title: `${servicesPage?.heroHeading ?? "Our Services"} | Shubhkamna Events`,
    description:
      servicesPage?.heroSubhead ??
      "Explore Shubhkamna Events' full catalog of event planning services — weddings, corporate events, social celebrations, decor, entertainment, and special events across Indore.",
    path: "/services",
  });
}

export default async function ServicesIndexPage(): Promise<ReactNode> {
  const [services, servicesPage, siteSettings] = await Promise.all([
    getServices(),
    getServicesPage(),
    getSiteSettings(),
  ]);

  return (
    <>
      <PageHero
        eyebrow={servicesPage?.heroEyebrow}
        heading={servicesPage?.heroHeading ?? "Our Services"}
        headlineHighlight={servicesPage?.heroHeadingHighlight}
        subhead={
          servicesPage?.heroSubhead ??
          "From intimate celebrations to large-scale professional events, explore our full range of event planning services."
        }
      />
      <Services
        items={services.map((service) => ({
          icon: service.icon,
          title: service.title,
          description: service.description,
          href: `/services/${service.slug}`,
        }))}
      />
      {servicesPage ? (
        <Process
          eyebrow={servicesPage.processEyebrow}
          heading={servicesPage.processHeading}
          steps={servicesPage.processSteps}
        />
      ) : null}
      {servicesPage?.faq ? (
        <FAQ
          heading={servicesPage.faq.heading}
          intro={servicesPage.faq.intro}
          items={servicesPage.faq.items}
        />
      ) : null}
      {servicesPage ? (
        <CtaBanner
          heading={servicesPage.ctaHeading}
          body={servicesPage.ctaBody}
          phone={siteSettings.organizationPhone}
          secondaryLabel={servicesPage.ctaSecondaryLabel}
          secondaryHref={servicesPage.ctaSecondaryHref}
        />
      ) : null}
    </>
  );
}
