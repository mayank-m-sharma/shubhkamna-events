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
});
