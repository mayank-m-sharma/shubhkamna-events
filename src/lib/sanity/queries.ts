export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  siteName,
  tagline,
  comingSoonHeadline,
  comingSoonMessage,
  seoTitle,
  seoDescription
}`;
