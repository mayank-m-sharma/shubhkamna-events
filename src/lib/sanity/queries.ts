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

// Each section's fields are merged in only when `_type` matches — GROQ's
// conditional-projection syntax — so a single query covers every section
// type in the discriminated union without a chain of separate queries.
export const homePageQuery = `*[_type == "homePage"][0]{
  sections[]{
    _type,
    _type == "heroSection" => {
      headline,
      headlineHighlight,
      subhead,
      backgroundImage ${imageProjection},
      backgroundImageAlt,
      backgroundVideoUrl,
      primaryCtaLabel,
      primaryCtaHref,
      secondaryCtaLabel,
      secondaryCtaHref,
      secondaryImage ${imageProjection},
      secondaryImageAlt
    },
    _type == "servicesSection" => {
      heading,
      intro,
      viewAllLabel,
      viewAllHref,
      items[]{ icon, title, description, href }
    },
    _type == "gallerySection" => {
      heading,
      intro,
      viewAllLabel,
      viewAllHref,
      images[]{
        image ${imageProjection},
        alt,
        caption,
        category
      }
    },
    _type == "testimonialsSection" => {
      heading,
      intro,
      items[]{
        quote,
        author,
        role,
        photo ${imageProjection},
        rating
      }
    },
    _type == "contactSection" => {
      variant,
      heading,
      intro,
      successMessage
    },
    _type == "statsSection" => {
      heading,
      items[]{ value, label }
    },
    _type == "aboutSection" => {
      eyebrow,
      heading,
      bodyFirst,
      bodySecond,
      checklist,
      ctaLabel,
      ctaHref,
      imageFirst ${imageProjection},
      imageFirstAlt,
      imageSecond ${imageProjection},
      imageSecondAlt
    }
  }
}`;

const serviceProjection = `{
  title,
  "slug": slug.current,
  icon,
  description,
  image ${imageProjection},
  imageAlt,
  features,
  gallery[]{
    image ${imageProjection},
    alt,
    caption,
    category
  },
  ctaLabel,
  ctaHref,
  order
}`;

export const serviceBySlugQuery = `*[_type == "service" && slug.current == $slug][0]${serviceProjection}`;

// Shared by generateStaticParams (route) and sitemap.ts — both only need
// slugs, not the full document, so this is a separate, cheaper projection
// rather than reusing serviceBySlugQuery.
export const serviceSlugsQuery = `*[_type == "service" && defined(slug.current)]{
  "slug": slug.current
}`;

export const galleryPageQuery = `*[_type == "galleryPage"][0]{
  heading,
  intro,
  images[]{
    image ${imageProjection},
    alt,
    caption,
    category
  }
}`;

export const contactPageQuery = `*[_type == "contactPage"][0]{
  heroEyebrow,
  heroHeading,
  heroSubhead,
  heroBackgroundImage ${imageProjection},
  contact{
    _type,
    variant,
    heading,
    intro,
    successMessage
  },
  areasServed,
  faq{
    heading,
    intro,
    items[]{ question, answer }
  }
}`;

// Sorted so an explicit editor-set `order` wins; services sharing the same
// (or unset) order fall back to alphabetical, matching the seed data's
// intended display order without depending on document creation order.
export const servicesQuery = `*[_type == "service" && defined(slug.current)] | order(order asc, title asc)${serviceProjection}`;

export const servicesPageQuery = `*[_type == "servicesPage"][0]{
  heroEyebrow,
  heroHeading,
  heroHeadingHighlight,
  heroSubhead,
  processEyebrow,
  processHeading,
  processSteps[]{ icon, title, description },
  faq{
    heading,
    intro,
    items[]{ question, answer }
  },
  ctaHeading,
  ctaBody,
  ctaSecondaryLabel,
  ctaSecondaryHref
}`;
