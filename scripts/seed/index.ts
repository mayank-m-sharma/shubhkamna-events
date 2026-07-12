import { siteSettingsSeed } from "./data/siteSettings";
import { siteThemeSeed } from "./data/siteTheme";
import { sanityWriteClient } from "./sanityWriteClient";
import { upsertDocument } from "./upsertDocument";

async function main(): Promise<void> {
  const settingsResult = await upsertDocument(sanityWriteClient, {
    _id: "siteSettings",
    _type: "siteSettings",
    ...siteSettingsSeed,
  });
  console.warn(`siteSettings: ${settingsResult}`);

  const themeResult = await upsertDocument(sanityWriteClient, {
    _id: "siteTheme",
    _type: "siteTheme",
    ...siteThemeSeed,
  });
  console.warn(`siteTheme: ${themeResult}`);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
