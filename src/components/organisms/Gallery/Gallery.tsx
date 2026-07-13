"use client";

import { useRef, useState, type ReactNode } from "react";

import { Heading } from "@/components/atoms/Heading";
import { Link } from "@/components/atoms/Link";
import { Text } from "@/components/atoms/Text";
import type { GalleryProps } from "@/types/gallery";

import styles from "./Gallery.module.scss";
import { GalleryItem } from "./GalleryItem";
import { GalleryLightbox } from "./GalleryLightbox";

const GALLERY_HEADING_ID = "gallery-heading";

export function Gallery({
  heading,
  intro,
  viewAllLabel,
  viewAllHref,
  images,
}: GalleryProps): ReactNode {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const showViewAllLink = Boolean(viewAllLabel && viewAllHref);

  function openLightbox(index: number): void {
    returnFocusRef.current = triggerRefs.current[index] ?? null;
    setActiveIndex(index);
  }

  function handleNavigate(direction: -1 | 1): void {
    setActiveIndex((current) => {
      if (current === null || images.length === 0) {
        return current;
      }

      return (current + direction + images.length) % images.length;
    });
  }

  return (
    <section
      className={styles.gallery}
      aria-labelledby={heading ? GALLERY_HEADING_ID : undefined}
    >
      <div className={styles.header}>
        <div>
          {heading ? (
            <Heading as="h2" size="lg" id={GALLERY_HEADING_ID}>
              {heading}
            </Heading>
          ) : null}
          {intro ? <Text className={styles.intro}>{intro}</Text> : null}
        </div>
        {showViewAllLink ? (
          <Link href={viewAllHref as string}>{viewAllLabel}</Link>
        ) : null}
      </div>
      {images.length > 0 ? (
        <div className={styles.grid}>
          {images.map((item, index) => (
            <GalleryItem
              key={item.image.asset._id}
              item={item}
              onOpen={() => openLightbox(index)}
              triggerRef={(el) => {
                triggerRefs.current[index] = el;
              }}
            />
          ))}
        </div>
      ) : null}
      {activeIndex !== null ? (
        <GalleryLightbox
          images={images}
          index={activeIndex}
          onClose={() => setActiveIndex(null)}
          onNavigate={handleNavigate}
          returnFocusRef={returnFocusRef}
        />
      ) : null}
    </section>
  );
}
