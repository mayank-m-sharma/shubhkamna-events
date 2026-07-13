import { Fragment, type ReactNode } from "react";

import type { HomePageSection } from "@/types/cms";

import type { PageBuilderExtras } from "./sectionRegistry";
import { sectionRegistry } from "./sectionRegistry";

interface PageBuilderProps {
  sections: HomePageSection[];
  extras: PageBuilderExtras;
}

// Keyed by `_type` rather than a Sanity `_key` — correct as long as the
// homepage has at most one section of each type, which is true for every
// section type this project has today. If a future ticket allows repeating
// a section type on the same page, this needs `_key` added to the schema
// and query instead.
export function PageBuilder({ sections, extras }: PageBuilderProps): ReactNode {
  return sections.map((section) => {
    const render = sectionRegistry[section._type] as (
      section: HomePageSection,
      extras: PageBuilderExtras,
    ) => ReactNode;

    if (!render) {
      if (process.env.NODE_ENV !== "production") {
        throw new Error(
          `PageBuilder: no organism registered for section type "${section._type}".`,
        );
      }

      console.error(
        `PageBuilder: skipping unregistered section type "${section._type}".`,
      );
      return null;
    }

    return <Fragment key={section._type}>{render(section, extras)}</Fragment>;
  });
}
