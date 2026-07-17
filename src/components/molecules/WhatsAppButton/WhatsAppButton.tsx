import type { ReactNode } from "react";

import { Icon } from "@/components/atoms/Icon";
import { cn } from "@/lib/utils/cn";
import { buildWhatsAppUrl } from "@/lib/utils/whatsapp";

import styles from "./WhatsAppButton.module.scss";

interface WhatsAppButtonProps {
  phoneNumber: string;
  className?: string;
}

// A plain anchor, not the `Link` atom — this is a circular icon-only FAB,
// not an inline text link, so it deliberately skips Link's
// external-link-glyph + "(opens in a new tab)" decoration.
export function WhatsAppButton({
  phoneNumber,
  className,
}: WhatsAppButtonProps): ReactNode {
  return (
    <a
      href={buildWhatsAppUrl(phoneNumber)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className={cn(styles.button, className)}
    >
      <Icon name="whatsapp" size="lg" />
    </a>
  );
}
