import type { ReactNode } from "react";

interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps): ReactNode {
  return (
    <script
      type="application/ld+json"
      // JSON-LD requires a literal <script> body, and `data` is always
      // server-built from typed CMS/config values, never raw user input.
      // eslint-disable-next-line react/no-danger -- required by the JSON-LD spec
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
