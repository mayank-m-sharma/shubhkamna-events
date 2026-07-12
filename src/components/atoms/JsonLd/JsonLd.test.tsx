import { render } from "@testing-library/react";

import { JsonLd } from "./JsonLd";

describe("JsonLd", () => {
  it("serializes the given data into a ld+json script tag", () => {
    const { container } = render(
      <JsonLd data={{ "@type": "Organization", name: "Shubhkamna Events" }} />,
    );

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );

    expect(script).not.toBeNull();
    expect(JSON.parse(script?.innerHTML ?? "")).toEqual({
      "@type": "Organization",
      name: "Shubhkamna Events",
    });
  });
});
