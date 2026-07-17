import { buildContactPageSeed } from "./data/contactPage";
import { footerConfigSeed } from "./data/footerConfig";
import { buildGalleryPageSeed } from "./data/galleryPage";
import { headerConfigSeed } from "./data/headerConfig";
import { buildHomePageSeed } from "./data/homePage";
import { buildServiceSeeds } from "./data/service";
import { servicesPageSeed } from "./data/servicesPage";
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

  const galleryPageSeed = await buildGalleryPageSeed(sanityWriteClient);
  const galleryPageResult = await upsertDocument(sanityWriteClient, {
    _id: "galleryPage",
    _type: "galleryPage",
    ...galleryPageSeed,
  });
  console.warn(`galleryPage: ${galleryPageResult}`);

  const contactPageSeed = await buildContactPageSeed(sanityWriteClient);
  const contactPageResult = await upsertDocument(sanityWriteClient, {
    _id: "contactPage",
    _type: "contactPage",
    ...contactPageSeed,
  });
  console.warn(`contactPage: ${contactPageResult}`);

  const servicesPageResult = await upsertDocument(sanityWriteClient, {
    _id: "servicesPage",
    _type: "servicesPage",
    ...servicesPageSeed,
  });
  console.warn(`servicesPage: ${servicesPageResult}`);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
