import { buildMetadata } from "./metadata";

describe("buildMetadata", () => {
  it("builds a canonical URL by resolving the path against the site URL", () => {
    const metadata = buildMetadata({
      title: "Shubhkamna Events",
      description: "A description",
      path: "/about",
    });

    expect(metadata.alternates?.canonical).toBe("http://localhost:3000/about");
  });

  it("defaults to the root path when none is given", () => {
    const metadata = buildMetadata({
      title: "Shubhkamna Events",
      description: "A description",
    });

    expect(metadata.alternates?.canonical).toBe("http://localhost:3000/");
  });

  it("passes the title and description through to openGraph and twitter", () => {
    const metadata = buildMetadata({
      title: "Title",
      description: "Description",
    });

    expect(metadata.openGraph?.title).toBe("Title");
    expect(metadata.openGraph?.description).toBe("Description");
    expect(metadata.twitter?.title).toBe("Title");
  });
});
