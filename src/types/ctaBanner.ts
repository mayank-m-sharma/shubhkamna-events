export interface CtaBannerProps {
  heading: string;
  body?: string;
  // Sourced from siteSettings, not this organism's own schema — rendered
  // as a tel: link with the number itself as the label, matching
  // ContactSection's banner CTA pattern.
  phone?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}
