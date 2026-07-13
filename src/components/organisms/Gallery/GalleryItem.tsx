import type { ReactNode, Ref } from "react";

import { Heading } from "@/components/atoms/Heading";
import { Image } from "@/components/atoms/Image";
import { Text } from "@/components/atoms/Text";
import type { GalleryImage } from "@/types/gallery";

import styles from "./Gallery.module.scss";

interface GalleryItemProps {
  item: GalleryImage;
  onOpen: () => void;
  triggerRef: Ref<HTMLButtonElement>;
}

export function GalleryItem({
  item,
  onOpen,
  triggerRef,
}: GalleryItemProps): ReactNode {
  return (
    <button
      type="button"
      ref={triggerRef}
      className={styles.item}
      onClick={onOpen}
    >
      <Image
        image={item.image}
        alt={item.alt}
        sizes="(min-width: 768px) 25vw, 50vw"
        className={styles.image}
      />
      {item.caption || item.category ? (
        <span className={styles.caption}>
          {item.caption ? (
            <Heading as="h3" size="md">
              {item.caption}
            </Heading>
          ) : null}
          {item.category ? (
            <Text size="base" muted>
              {item.category}
            </Text>
          ) : null}
        </span>
      ) : null}
    </button>
  );
}
