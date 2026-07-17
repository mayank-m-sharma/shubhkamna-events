export interface ContactInfoPanelProps {
  intro?: string;
  // Sourced from siteSettings (SHU-003/SHU-030), not this organism's own
  // schema — omitted independently when unset, same pattern as
  // ContactSection's banner CTAs.
  whatsappNumber?: string;
  phone?: string;
  officeAddress?: string;
  areasServed: string[];
}
