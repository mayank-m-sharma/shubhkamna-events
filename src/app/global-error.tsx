"use client";

import type { ReactNode } from "react";

import { Button } from "@/components/atoms/Button";
import { Heading } from "@/components/atoms/Heading";
import { Text } from "@/components/atoms/Text";
import { getFontClassName } from "@/lib/theme/fonts";

import styles from "./global-error.module.scss";

// Next only renders this in production, and only for errors thrown by the
// root layout itself (any error inside a page/route segment is caught
// there instead) — it must define its own <html>/<body> since it fully
// replaces the root layout, so it can't assume ThemeProvider or any other
// app-tree component rendered successfully.
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}): ReactNode {
  return (
    <html lang="en" className={getFontClassName()}>
      <body>
        <div className={styles.wrapper}>
          <Heading as="h1" size="xl">
            Something went wrong
          </Heading>
          <Text size="md" muted>
            We hit an unexpected error on our end. You can try again, or head
            back to the homepage.
          </Text>
          <div className={styles.actions}>
            <Button onClick={reset}>Try again</Button>
            <Button href="/" variant="ghost">
              Back to homepage
            </Button>
          </div>
        </div>
      </body>
    </html>
  );
}
