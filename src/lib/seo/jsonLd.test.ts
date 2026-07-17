import {
  buildBreadcrumbJsonLd,
  buildContactPageJsonLd,
  buildOrganizationJsonLd,
  buildServiceJsonLd,
} from "./jsonLd";

describe("buildOrganizationJsonLd", () => {
  it("builds a schema.org Organization object from the given name/description", () => {
    const jsonLd = buildOrganizationJsonLd({
      name: "Shubhkamna Events",
      description: "Event planning services.",
    });

    expect(jsonLd).toMatchObject({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Shubhkamna Events",
      description: "Event planning services.",
      url: "http://localhost:3000",
    });
  });

  it("omits legalName/address/telephone/logo/sameAs when not given", () => {
    const jsonLd = buildOrganizationJsonLd({
      name: "Shubhkamna Events",
      description: "Event planning services.",
    });

    expect(jsonLd).not.toHaveProperty("legalName");
    expect(jsonLd).not.toHaveProperty("address");
    expect(jsonLd).not.toHaveProperty("telephone");
    expect(jsonLd).not.toHaveProperty("logo");
    expect(jsonLd).not.toHaveProperty("sameAs");
  });

  it("includes legalName/address/telephone/logo/sameAs when present", () => {
    const jsonLd = buildOrganizationJsonLd({
      name: "Shubhkamna Events",
      description: "Event planning services.",
      legalName: "Shubhkamna Events",
      address: "Chhawni, Indore, Madhya Pradesh 452001",
      phone: "+919754455007",
      logoUrl: "https://cdn.sanity.io/images/proj/ds/logo.png",
      sameAs: ["https://www.instagram.com/shubhkamnaevents02/"],
    });

    expect(jsonLd).toMatchObject({
      legalName: "Shubhkamna Events",
      address: "Chhawni, Indore, Madhya Pradesh 452001",
      telephone: "+919754455007",
      logo: "https://cdn.sanity.io/images/proj/ds/logo.png",
      sameAs: ["https://www.instagram.com/shubhkamnaevents02/"],
    });
  });

  it("omits sameAs when given an empty array", () => {
    const jsonLd = buildOrganizationJsonLd({
      name: "Shubhkamna Events",
      description: "Event planning services.",
      sameAs: [],
    });

    expect(jsonLd).not.toHaveProperty("sameAs");
  });
});

describe("buildServiceJsonLd", () => {
  it("builds a schema.org Service object with a nested Organization provider", () => {
    const jsonLd = buildServiceJsonLd({
      name: "Weddings",
      description: "Complete wedding planning and engagement coordination.",
      url: "http://localhost:3000/services/weddings",
      providerName: "Shubhkamna Events",
    });

    expect(jsonLd).toMatchObject({
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Weddings",
      name: "Weddings",
      description: "Complete wedding planning and engagement coordination.",
      url: "http://localhost:3000/services/weddings",
      provider: {
        "@type": "Organization",
        name: "Shubhkamna Events",
      },
    });
  });

  it("includes image when given, omits it when not", () => {
    const withImage = buildServiceJsonLd({
      name: "Weddings",
      description: "Description.",
      url: "http://localhost:3000/services/weddings",
      providerName: "Shubhkamna Events",
      imageUrl: "https://cdn.sanity.io/images/proj/ds/wedding.jpg",
    });

    expect(withImage).toMatchObject({
      image: "https://cdn.sanity.io/images/proj/ds/wedding.jpg",
    });

    const withoutImage = buildServiceJsonLd({
      name: "Weddings",
      description: "Description.",
      url: "http://localhost:3000/services/weddings",
      providerName: "Shubhkamna Events",
    });

    expect(withoutImage).not.toHaveProperty("image");
  });
});

describe("buildBreadcrumbJsonLd", () => {
  it("builds a schema.org BreadcrumbList with 1-based positions", () => {
    const jsonLd = buildBreadcrumbJsonLd([
      { name: "Home", url: "http://localhost:3000" },
      { name: "Services", url: "http://localhost:3000/services" },
      { name: "Weddings", url: "http://localhost:3000/services/weddings" },
    ]);

    expect(jsonLd).toEqual({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "http://localhost:3000",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Services",
          item: "http://localhost:3000/services",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Weddings",
          item: "http://localhost:3000/services/weddings",
        },
      ],
    });
  });
});

describe("buildContactPageJsonLd", () => {
  it("builds a schema.org ContactPage with a nested LocalBusiness mainEntity", () => {
    const jsonLd = buildContactPageJsonLd({
      url: "http://localhost:3000/contact",
      organizationName: "Shubhkamna Events",
      organizationAddress: "Chhawni, Indore, Madhya Pradesh 452001",
      organizationPhone: "+919754455007",
    });

    expect(jsonLd).toEqual({
      "@context": "https://schema.org",
      "@type": "ContactPage",
      url: "http://localhost:3000/contact",
      mainEntity: {
        "@type": "LocalBusiness",
        name: "Shubhkamna Events",
        address: "Chhawni, Indore, Madhya Pradesh 452001",
        telephone: "+919754455007",
      },
    });
  });

  it("omits address/telephone from mainEntity when not given", () => {
    const jsonLd = buildContactPageJsonLd({
      url: "http://localhost:3000/contact",
      organizationName: "Shubhkamna Events",
    });

    expect(jsonLd.mainEntity).toEqual({
      "@type": "LocalBusiness",
      name: "Shubhkamna Events",
    });
  });
});
