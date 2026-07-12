import path from "node:path";

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Sanity Studio bundles client-only code (e.g. swr) that Next's RSC module
  // graph analysis misresolves when traced directly; treating it as an
  // external package lets it load at runtime instead, which is the pattern
  // next-sanity's own docs recommend for the embedded App Router studio.
  serverExternalPackages: ["sanity"],
  // Pin the workspace root explicitly: an unrelated lockfile in a parent
  // directory otherwise makes Next guess the wrong project root.
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
