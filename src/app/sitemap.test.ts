jest.mock("@/lib/sanity/getServiceSlugs", () => ({
  getServiceSlugs: jest.fn(),
}));

import { getServiceSlugs } from "@/lib/sanity/getServiceSlugs";

import sitemap from "./sitemap";

const mockGetServiceSlugs = getServiceSlugs as jest.MockedFunction<
  typeof getServiceSlugs
>;

describe("sitemap", () => {
  it("always includes the homepage and services index", async () => {
    mockGetServiceSlugs.mockResolvedValue([]);

    const entries = await sitemap();

    expect(entries.map((entry) => entry.url)).toEqual(
      expect.arrayContaining([
        "http://localhost:3000",
        "http://localhost:3000/services",
      ]),
    );
  });

  it("includes a canonical URL for every published service slug", async () => {
    mockGetServiceSlugs.mockResolvedValue(["weddings", "corporate"]);

    const entries = await sitemap();

    expect(entries.map((entry) => entry.url)).toEqual(
      expect.arrayContaining([
        "http://localhost:3000/services/weddings",
        "http://localhost:3000/services/corporate",
      ]),
    );
  });
});
