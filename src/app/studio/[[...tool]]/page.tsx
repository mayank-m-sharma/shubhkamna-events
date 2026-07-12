"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";

import config from "../../../../sanity.config";

// Sanity Studio is a client-only authoring SPA; it gains nothing from SSR
// and its bundled UI internals aren't SSR-safe alongside Next's React copy,
// so rendering is deferred to the client entirely.
const NextStudio = dynamic(
  () => import("next-sanity/studio").then((studio) => studio.NextStudio),
  { ssr: false },
);

export default function StudioPage(): ReactNode {
  return <NextStudio config={config} />;
}
