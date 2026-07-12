import { siteSettingsSchema } from "@/lib/validations/siteSettings.schema";

import { siteSettingsSeed } from "./siteSettings";

describe("siteSettingsSeed", () => {
  it("is a valid siteSettings document", () => {
    const result = siteSettingsSchema.safeParse(siteSettingsSeed);

    expect(result.success).toBe(true);
  });

  it("carries the real organization/review data from the SHU-000 audit", () => {
    expect(siteSettingsSeed.organizationPhone).toBe("+919754455007");
    expect(siteSettingsSeed.whatsappNumber).toBe("+919754455007");
    expect(siteSettingsSeed.reviewRating).toBe(5);
    expect(siteSettingsSeed.reviewCount).toBe(50);
    expect(siteSettingsSeed.socialLinks).toEqual([
      {
        platform: "instagram",
        url: "https://www.instagram.com/shubhkamnaevents02/",
      },
    ]);
  });
});
