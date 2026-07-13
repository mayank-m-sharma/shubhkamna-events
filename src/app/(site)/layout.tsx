import type { ReactNode } from "react";

import { SiteShell } from "@/components/providers/SiteShell";

// Every real page lives under this route group so it gets the site's
// Header/Footer chrome. `/studio` is a sibling route outside this group —
// Sanity Studio renders its own full-screen UI and must not inherit this.
export default function SiteLayout({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  return <SiteShell>{children}</SiteShell>;
}
