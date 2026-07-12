import { z } from "zod";

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
  hotspot: z
    .object({
      x: z.number(),
      y: z.number(),
      width: z.number(),
      height: z.number(),
    })
    .optional(),
});

export type SanityImage = z.infer<typeof sanityImageSchema>;
