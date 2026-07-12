import { siteThemeSchema } from "@/lib/validations/theme.schema";

import { siteThemeSeed } from "./siteTheme";

describe("siteThemeSeed", () => {
  it("is a valid siteTheme document", () => {
    const result = siteThemeSchema.safeParse(siteThemeSeed);

    expect(result.success).toBe(true);
  });

  it("carries the real colors/fonts from the SHU-000 audit", () => {
    expect(siteThemeSeed.colorPrimary).toBe("#1a227f");
    expect(siteThemeSeed.colorAccent).toBe("#d81b60");
    expect(siteThemeSeed.headingFont).toBe("montserrat");
    expect(siteThemeSeed.bodyFont).toBe("inter");
  });
});
