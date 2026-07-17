import { z } from "zod";

import { optionalNullable } from "@/lib/validations/zodHelpers";

export const faqItemSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
});

export type FaqItem = z.infer<typeof faqItemSchema>;

export const faqSectionSchema = z.object({
  heading: optionalNullable(z.string()),
  intro: optionalNullable(z.string()),
  items: z
    .array(faqItemSchema)
    .nullish()
    .transform((value) => value ?? []),
});

export type FaqSection = z.infer<typeof faqSectionSchema>;
