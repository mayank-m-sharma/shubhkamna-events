import { z } from "zod";

import { optionalNullable } from "@/lib/validations/zodHelpers";

// Shape produced by dereferencing a Sanity `image` field's asset in GROQ
// (`asset->{ _id, url, metadata{ dimensions{ width, height } } }`) — gives
// next/image its required width/height up front, no separate round trip.
export const sanityImageSchema = z.object({
  asset: z.object({
    _id: z.string().min(1),
    url: z.string().url(),
    metadata: z.object({
      dimensions: z.object({
        width: z.number(),
        height: z.number(),
      }),
    }),
  }),
  // GROQ returns `null` (not omitted/undefined) for a hotspot the editor
  // never set — `optionalNullable` normalizes that the same way every
  // other optional CMS field in this project does.
  hotspot: optionalNullable(
    z.object({
      x: z.number(),
      y: z.number(),
      width: z.number(),
      height: z.number(),
    }),
  ),
});

export type SanityImage = z.infer<typeof sanityImageSchema>;
