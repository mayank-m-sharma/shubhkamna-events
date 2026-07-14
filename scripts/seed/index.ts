import { footerConfigSeed } from "./data/footerConfig";
import { headerConfigSeed } from "./data/headerConfig";
import { buildHomePageSeed } from "./data/homePage";
import { buildServiceSeeds } from "./data/service";
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

  const headerResult = await upsertDocument(sanityWriteClient, {
    _id: "headerConfig",
    _type: "headerConfig",
    ...headerConfigSeed,
  });
  console.warn(`headerConfig: ${headerResult}`);

  const footerResult = await upsertDocument(sanityWriteClient, {
    _id: "footerConfig",
    _type: "footerConfig",
    ...footerConfigSeed,
  });
  console.warn(`footerConfig: ${footerResult}`);

  const homePageSeed = await buildHomePageSeed(sanityWriteClient);
  const homePageResult = await upsertDocument(sanityWriteClient, {
    _id: "homePage",
    _type: "homePage",
    ...homePageSeed,
  });
  console.warn(`homePage: ${homePageResult}`);

  const serviceSeeds = await buildServiceSeeds(sanityWriteClient);
  for (const serviceSeed of serviceSeeds) {
    const serviceResult = await upsertDocument(sanityWriteClient, {
      ...serviceSeed,
    });
    console.warn(`service (${serviceSeed.slug.current}): ${serviceResult}`);
  }
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
