import { buildOrganizationJsonLd } from "./jsonLd";

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
