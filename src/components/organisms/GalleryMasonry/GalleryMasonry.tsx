"use client";

import type { ReactNode } from "react";

import { Heading } from "@/components/atoms/Heading";
import { Image } from "@/components/atoms/Image";
import { Text } from "@/components/atoms/Text";
import { GalleryLightbox } from "@/components/molecules/GalleryLightbox";
import { useGalleryLightbox } from "@/hooks/useGalleryLightbox";
import type { GalleryMasonryProps } from "@/types/galleryMasonry";

import styles from "./GalleryMasonry.module.scss";

export function GalleryMasonry({ images }: GalleryMasonryProps): ReactNode {
  const {
    activeIndex,
    openLightbox,
    closeLightbox,
    handleNavigate,
    setTriggerRef,
    returnFocusRef,
  } = useGalleryLightbox(images.length);

  if (images.length === 0) {
    return null;
  }

  return (
    <section className={styles.wrapper}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.masonry}>
        {images.map((item, index) => (
          <button
            key={item.image.asset._id}
            type="button"
            ref={(el) => setTriggerRef(index, el)}
            className={styles.item}
            onClick={() => openLightbox(index)}
          >
            <span className={styles.frame}>
              <Image
                image={item.image}
                alt={item.alt}
                sizes="(min-width: 1024px) 33vw, (min-width: 480px) 50vw, 100vw"
                className={styles.media}
              />
              {item.caption || item.category ? (
                <span className={styles.glass}>
                  {item.caption ? (
                    <Heading as="h3" size="md" className={styles.glassCaption}>
                      {item.caption}
                    </Heading>
                  ) : null}
                  {item.category ? (
                    <Text className={styles.glassCategory}>
                      {item.category}
                    </Text>
                  ) : null}
                </span>
              ) : null}
            </span>
          </button>
        ))}
      </div>
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
