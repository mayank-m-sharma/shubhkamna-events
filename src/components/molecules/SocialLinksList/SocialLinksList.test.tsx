import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";

import { SocialLinksList } from "./SocialLinksList";

describe("SocialLinksList", () => {
  it("renders a link per CMS item with an accessible platform name", () => {
    render(
      <SocialLinksList
        links={[
          { platform: "instagram", url: "https://www.instagram.com/example/" },
          { platform: "facebook", url: "https://www.facebook.com/example/" },
        ]}
      />,
    );

    expect(screen.getByRole("link", { name: /Instagram/ })).toHaveAttribute(
      "href",
      "https://www.instagram.com/example/",
    );
    expect(screen.getByRole("link", { name: /Facebook/ })).toHaveAttribute(
      "href",
      "https://www.facebook.com/example/",
    );
  });

  it("renders nothing (no list) when given zero links", () => {
    const { container } = render(<SocialLinksList links={[]} />);

    expect(container.querySelectorAll("li")).toHaveLength(0);
  });

  it("renders one link correctly", () => {
    render(
      <SocialLinksList
        links={[
          { platform: "youtube", url: "https://www.youtube.com/example" },
        ]}
      />,
    );

    expect(screen.getAllByRole("link")).toHaveLength(1);
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <SocialLinksList
        links={[
          { platform: "instagram", url: "https://www.instagram.com/example/" },
          { platform: "twitter", url: "https://twitter.com/example" },
        ]}
      />,
    );

    expect(await axe(container)).toHaveNoViolations();
  });
});
