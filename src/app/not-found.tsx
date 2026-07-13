import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Button } from "@/components/atoms/Button";
import { Heading } from "@/components/atoms/Heading";
import { Text } from "@/components/atoms/Text";
import { SiteShell } from "@/components/providers/SiteShell";

import styles from "./not-found.module.scss";

export const metadata: Metadata = {
  title: "Page not found",
};

// Sits at the true app root (not inside the `(site)` route group) because
// Next only resolves genuinely unmatched URLs against the root not-found
// boundary — nested route-group boundaries only fire from an explicit
// `notFound()` call within that segment. Composes SiteShell directly so a
// lost visitor still gets full site nav, not just a bare message.
export default function NotFound(): ReactNode {
  return (
    <SiteShell>
      <div className={styles.wrapper}>
        <Heading as="h1" size="xl">
          Page not found
        </Heading>
        <Text size="md" muted>
          The page you&rsquo;re looking for doesn&rsquo;t exist or may have
          moved.
        </Text>
        <Button href="/">Back to homepage</Button>
      </div>
    </SiteShell>
  );
}
