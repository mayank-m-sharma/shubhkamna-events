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

  it("uses a plain string title when no titleTemplate is given", () => {
    const metadata = buildMetadata({
      title: "Title",
      description: "Description",
    });

    expect(metadata.title).toBe("Title");
  });

  it("uses a default/template title object when titleTemplate is given", () => {
    const metadata = buildMetadata({
      title: "Title",
      description: "Description",
      titleTemplate: "%s | Shubhkamna Events",
    });

    expect(metadata.title).toEqual({
      default: "Title",
      template: "%s | Shubhkamna Events",
    });
  });

  it("omits openGraph/twitter images when no ogImageUrl is given", () => {
    const metadata = buildMetadata({
      title: "Title",
      description: "Description",
    });

    expect(metadata.openGraph?.images).toBeUndefined();
    expect(metadata.twitter?.images).toBeUndefined();
  });

  it("sets openGraph/twitter images when ogImageUrl is given", () => {
    const metadata = buildMetadata({
      title: "Title",
      description: "Description",
      ogImageUrl: "https://cdn.sanity.io/images/proj/ds/og.png",
    });

    expect(metadata.openGraph?.images).toEqual([
      { url: "https://cdn.sanity.io/images/proj/ds/og.png" },
    ]);
    expect(metadata.twitter?.images).toEqual([
      "https://cdn.sanity.io/images/proj/ds/og.png",
    ]);
  });
});
