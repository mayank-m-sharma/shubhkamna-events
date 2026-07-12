import { headerConfigSchema } from "@/lib/validations/headerConfig.schema";

import { headerConfigSeed } from "./headerConfig";

describe("headerConfigSeed", () => {
  it("is a valid headerConfig document", () => {
    const result = headerConfigSchema.safeParse(headerConfigSeed);

    expect(result.success).toBe(true);
  });

  it("carries the reference site's real nav order from the SHU-000 audit", () => {
    expect(headerConfigSeed.navItems.map((item) => item.label)).toEqual([
      "Home",
      "Services",
      "Gallery",
      "Contact",
    ]);
    expect(headerConfigSeed.ctaHref).toBe("tel:+919754455007");
  });
});
