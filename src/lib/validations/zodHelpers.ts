import type { z } from "zod";

// GROQ returns `null` (not `undefined`) for a field the editor hasn't set —
// normalize that to `undefined` so the inferred TS type stays a clean
// optional (`T | undefined`) instead of leaking `| null` into every consumer.
export function optionalNullable<Schema extends z.ZodTypeAny>(
  schema: Schema,
): z.ZodType<z.infer<Schema> | undefined> {
  return schema.nullish().transform((value) => value ?? undefined);
}
