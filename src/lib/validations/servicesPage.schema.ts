import { z } from "zod";

import { faqSectionSchema } from "@/lib/validations/faqSection.schema";
import { optionalNullable } from "@/lib/validations/zodHelpers";

// The icon set services.html's "Our Process" roadmap actually uses
// (SHU-000's audit §2.4) — a small, dedicated enum rather than the full
// app-wide icon set, so editors aren't offered irrelevant options.
export const processIconSchema = z.enum([
  "chat",
  "palette",
  "calendar",
  "check",
]);

export const processStepSchema = z.object({
  icon: processIconSchema,
  title: z.string().min(1),
  description: z.string().min(1),
});

export type ProcessStep = z.infer<typeof processStepSchema>;

export const servicesPageSchema = z.object({
  heroEyebrow: optionalNullable(z.string()),
  heroHeading: z.string().min(1),
  heroHeadingHighlight: optionalNullable(z.string()),
  heroSubhead: optionalNullable(z.string()),
  processEyebrow: optionalNullable(z.string()),
  processHeading: optionalNullable(z.string()),
  processSteps: z
    .array(processStepSchema)
    .nullish()
    .transform((value) => value ?? []),
  // Reused from SHU-027 — optional, same as contactPage's faq field.
  faq: optionalNullable(faqSectionSchema),
  ctaHeading: z.string().min(1),
  ctaBody: optionalNullable(z.string()),
  ctaSecondaryLabel: optionalNullable(z.string()),
  ctaSecondaryHref: optionalNullable(z.string()),
});

export type ServicesPage = z.infer<typeof servicesPageSchema>;
