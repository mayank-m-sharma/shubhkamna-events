"use client";

import type { ReactNode } from "react";

import { Heading } from "@/components/atoms/Heading";
import { Link } from "@/components/atoms/Link";
import { Text } from "@/components/atoms/Text";
import { GalleryLightbox } from "@/components/molecules/GalleryLightbox";
import { useGalleryLightbox } from "@/hooks/useGalleryLightbox";
import type { GalleryProps } from "@/types/gallery";

import styles from "./Gallery.module.scss";
import { GalleryItem } from "./GalleryItem";

const GALLERY_HEADING_ID = "gallery-heading";

export function Gallery({
  heading,
  intro,
  viewAllLabel,
  viewAllHref,
  images,
}: GalleryProps): ReactNode {
  const {
    activeIndex,
    openLightbox,
    closeLightbox,
    handleNavigate,
    setTriggerRef,
    returnFocusRef,
  } = useGalleryLightbox(images.length);
  const showViewAllLink = Boolean(viewAllLabel && viewAllHref);

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
              triggerRef={(el) => setTriggerRef(index, el)}
            />
          ))}
        </div>
      ) : null}
      {activeIndex !== null ? (
        <GalleryLightbox
          images={images}
          index={activeIndex}
          onClose={closeLightbox}
          onNavigate={handleNavigate}
          returnFocusRef={returnFocusRef}
        />
      ) : null}
    </section>
  );
}
