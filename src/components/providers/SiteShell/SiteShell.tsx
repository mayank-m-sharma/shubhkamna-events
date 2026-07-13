import type { ReactNode } from "react";

import { Footer } from "@/components/organisms/Footer";
import { Header } from "@/components/organisms/Header";
import { MainContent } from "@/components/providers/MainContent";
import { getFooterConfig } from "@/lib/sanity/getFooterConfig";
import { getHeaderConfig } from "@/lib/sanity/getHeaderConfig";
import { getSiteSettings } from "@/lib/sanity/getSiteSettings";

// Server component: the single place that wires the CMS-driven Header and
// Footer around every real page's content. Deliberately not part of the
// root layout so the `/studio` route (its own sibling route group) never
// renders this site chrome — Sanity Studio has its own UI.
export async function SiteShell({
  children,
}: {
  children: ReactNode;
}): Promise<ReactNode> {
  const [siteSettings, headerConfig, footerConfig] = await Promise.all([
    getSiteSettings(),
    getHeaderConfig(),
    getFooterConfig(),
  ]);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Header
        siteName={siteSettings.siteName}
        logo={headerConfig.logo ?? siteSettings.logo}
        navItems={headerConfig.navItems}
        ctaLabel={headerConfig.ctaLabel}
        ctaHref={headerConfig.ctaHref}
      />
      <MainContent>{children}</MainContent>
      <Footer
        columns={footerConfig.columns}
        contactPhone={footerConfig.contactPhone}
        contactEmail={footerConfig.contactEmail}
        contactAddress={footerConfig.contactAddress}
        socialLinks={footerConfig.socialLinks}
        copyrightText={footerConfig.copyrightText}
      />
    </>
  );
}
