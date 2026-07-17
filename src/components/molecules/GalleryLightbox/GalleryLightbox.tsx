"use client";

import {
  useRef,
  type KeyboardEvent,
  type ReactNode,
  type RefObject,
} from "react";

import { Icon } from "@/components/atoms/Icon";
import { Image } from "@/components/atoms/Image";
import { Text } from "@/components/atoms/Text";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import type { GalleryImage } from "@/types/gallery";

import styles from "./GalleryLightbox.module.scss";

interface GalleryLightboxProps {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onNavigate: (direction: -1 | 1) => void;
  returnFocusRef: RefObject<HTMLElement | null>;
}

export function GalleryLightbox({
  images,
  index,
  onClose,
  onNavigate,
  returnFocusRef,
}: GalleryLightboxProps): ReactNode {
  const containerRef = useRef<HTMLDivElement>(null);
  const image = images[index];

  useFocusTrap(containerRef, { active: true, onClose, returnFocusRef });

  if (!image) {
    return null;
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>): void {
    if (event.key === "ArrowRight") {
      onNavigate(1);
    } else if (event.key === "ArrowLeft") {
      onNavigate(-1);
    }
  }

  return (
    <div
      ref={containerRef}
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label={image.caption || image.alt}
      onKeyDown={handleKeyDown}
    >
      <button
        type="button"
        className={styles.close}
        onClick={onClose}
        aria-label="Close"
      >
        <Icon name="close" />
      </button>
      {images.length > 1 ? (
        <>
          <button
            type="button"
            className={styles.prev}
            onClick={() => onNavigate(-1)}
            aria-label="Previous image"
          >
            <Icon name="chevron-down" className={styles.prevIcon} />
          </button>
          <button
            type="button"
            className={styles.next}
            onClick={() => onNavigate(1)}
            aria-label="Next image"
          >
            <Icon name="chevron-down" className={styles.nextIcon} />
          </button>
        </>
      ) : null}
      <div className={styles.imageWrapper}>
        <Image
          image={image.image}
          alt={image.alt}
          fill
          sizes="90vw"
          className={styles.image}
        />
      </div>
      {image.caption || image.category ? (
        <div className={styles.caption}>
          {image.caption ? <Text size="md">{image.caption}</Text> : null}
          {image.category ? (
            <Text size="base" muted>
              {image.category}
            </Text>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
