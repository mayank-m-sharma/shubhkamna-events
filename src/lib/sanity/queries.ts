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

export const headerConfigQuery = `*[_type == "headerConfig"][0]{
  logo ${imageProjection},
  navItems[]{
    label,
    href
  },
  ctaLabel,
  ctaHref
}`;

export const footerConfigQuery = `*[_type == "footerConfig"][0]{
  columns[]{
    title,
    links[]{
      label,
      href
    }
  },
  contactPhone,
  contactEmail,
  contactAddress,
  socialLinks[]{
    platform,
    url
  },
  copyrightText
}`;

export const siteThemeQuery = `*[_type == "siteTheme"][0]{
  colorPrimary,
  colorSecondary,
  colorAccent,
  colorBackground,
  colorSurface,
  colorText,
  colorBackgroundDark,
  colorTextInverse,
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
