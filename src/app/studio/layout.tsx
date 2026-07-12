import type { Metadata } from "next";
import type { ReactNode } from "react";

// The Studio route must never be indexed — it's an authoring tool, not
// public content. Metadata has to live here (a Server Component) since the
// studio page itself is a Client Component and can't export `metadata`.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function StudioLayout({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  return children;
}
