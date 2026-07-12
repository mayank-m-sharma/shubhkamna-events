import { render, screen } from "@testing-library/react";

import { ComingSoonHero } from "./ComingSoonHero";

describe("ComingSoonHero", () => {
  it("renders only the CMS-shaped copy it receives, nothing hardcoded", () => {
    render(
      <ComingSoonHero
        tagline="Celebrations, planned with care."
        headline="Something wonderful is on its way."
        message="Check back soon."
      />,
    );

    expect(
      screen.getByText("Celebrations, planned with care."),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Something wonderful is on its way.",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("Check back soon.")).toBeInTheDocument();
  });

  it("exposes an accessible landmark name via the heading", () => {
    render(
      <ComingSoonHero tagline="Tag" headline="Headline" message="Message" />,
    );

    expect(
      screen.getByRole("region", { name: "Headline" }),
    ).toBeInTheDocument();
  });
});
