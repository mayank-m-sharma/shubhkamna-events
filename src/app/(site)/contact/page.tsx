import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { JsonLd } from "@/components/atoms/JsonLd";
import { ContactHero } from "@/components/organisms/ContactHero";
import { ContactInfoPanel } from "@/components/organisms/ContactInfoPanel";
import { ContactSection } from "@/components/organisms/ContactSection";
import { FAQ } from "@/components/organisms/FAQ";
import { siteUrl } from "@/lib/sanity/env";
import { getContactPage } from "@/lib/sanity/getContactPage";
import { getSiteSettings } from "@/lib/sanity/getSiteSettings";
import {
  buildBreadcrumbJsonLd,
  buildContactPageJsonLd,
} from "@/lib/seo/jsonLd";
import { buildMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const contactPage = await getContactPage();

  if (!contactPage) {
    return { title: "Contact page not found" };
  }

  return buildMetadata({
    title: `${contactPage.heroHeading} | Shubhkamna Events`,
    description:
      contactPage.heroSubhead ??
      "Get in touch with Shubhkamna Events for a personalized quote on your next celebration in Indore.",
    path: "/contact",
  });
}

export default async function ContactPage(): Promise<ReactNode> {
  const [contactPage, siteSettings] = await Promise.all([
    getContactPage(),
    getSiteSettings(),
  ]);

  if (!contactPage) {
    notFound();
  }

  const contactUrl = new URL("/contact", siteUrl).toString();

  return (
    <>
      <JsonLd
        data={buildContactPageJsonLd({
          url: contactUrl,
          organizationName: siteSettings.siteName,
          organizationAddress: siteSettings.organizationAddress,
          organizationPhone: siteSettings.organizationPhone,
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", url: siteUrl },
          { name: contactPage.heroHeading, url: contactUrl },
        ])}
      />
      <ContactHero
        heading={contactPage.heroHeading}
        subhead={contactPage.heroSubhead}
        backgroundImage={contactPage.heroBackgroundImage}
      />
      <ContactSection
        variant={contactPage.contact.variant}
        heading={contactPage.contact.heading}
        intro={contactPage.contact.intro}
        successMessage={contactPage.contact.successMessage}
        phone={siteSettings.organizationPhone}
        whatsappNumber={siteSettings.whatsappNumber}
      />
      <ContactInfoPanel
        whatsappNumber={siteSettings.whatsappNumber}
        phone={siteSettings.organizationPhone}
        officeAddress={siteSettings.organizationAddress}
        areasServed={contactPage.areasServed}
      />
      {contactPage.faq ? (
        <FAQ
          heading={contactPage.faq.heading}
          intro={contactPage.faq.intro}
          items={contactPage.faq.items}
        />
      ) : null}
    </>
  );
}
