const imageProjection = `{
  "asset": asset->{
    _id,
    url,
    metadata { dimensions { width, height } }
  },
  hotspot
}`;

export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  siteName,
  tagline,
  comingSoonHeadline,
  comingSoonMessage,
  seoTitle,
  seoDescription,
  logo ${imageProjection},
  favicon ${imageProjection},
  ogImage ${imageProjection},
  socialLinks[]{
    platform,
    url
  },
  organizationLegalName,
  organizationAddress,
  organizationPhone,
  whatsappNumber,
  reviewRating,
  reviewCount,
  reviewUrl
}`;

export const siteThemeQuery = `*[_type == "siteTheme"][0]{
  colorPrimary,
  colorSecondary,
  colorAccent,
  colorBackground,
  colorSurface,
  colorText,
  headingFont,
  bodyFont,
  fontSizeXs,
  fontSizeSm,
  fontSizeBase,
  fontSizeMd,
  fontSizeLg,
  fontSizeXl,
  fontSize2xl,
  spaceXs,
  spaceSm,
  spaceMd,
  spaceLg,
  spaceXl,
  space2xl
}`;
