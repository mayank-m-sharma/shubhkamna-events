import { footerConfigSchema } from "@/lib/validations/footerConfig.schema";

import { footerConfigSeed } from "./footerConfig";

describe("footerConfigSeed", () => {
  it("is a valid footerConfig document", () => {
    const result = footerConfigSchema.safeParse(footerConfigSeed);

    expect(result.success).toBe(true);
  });

  it("carries the reference site's real footer columns from the SHU-000 audit", () => {
    expect(footerConfigSeed.columns.map((column) => column.title)).toEqual([
      "Quick Links",
      "Services",
    ]);
    expect(footerConfigSeed.contactPhone).toBe("+919754455007");
    expect(footerConfigSeed.contactEmail).toBe("shubhkamnaevents02@gmail.com");
  });
});
