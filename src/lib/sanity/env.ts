import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().min(1),
  NEXT_PUBLIC_SANITY_DATASET: z.string().min(1),
  NEXT_PUBLIC_SANITY_API_VERSION: z.string().min(1),
  NEXT_PUBLIC_SITE_URL: z.string().url(),
});

const parsed = envSchema.safeParse({
  NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
  NEXT_PUBLIC_SANITY_API_VERSION: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
});

if (!parsed.success) {
  throw new Error(
    `Invalid Sanity/site environment variables: ${parsed.error.message}`,
  );
}

export const projectId = parsed.data.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = parsed.data.NEXT_PUBLIC_SANITY_DATASET;
export const apiVersion = parsed.data.NEXT_PUBLIC_SANITY_API_VERSION;
export const siteUrl = parsed.data.NEXT_PUBLIC_SITE_URL;
