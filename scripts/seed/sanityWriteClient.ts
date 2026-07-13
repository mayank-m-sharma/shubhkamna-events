// Re-exported from src/lib/sanity/writeClient.ts (the canonical client) now
// that a Server Action (submitEnquiry, SHU-014) needs the same write
// access the seed script always has — one client construction, not two.
export { sanityWriteClient } from "@/lib/sanity/writeClient";
