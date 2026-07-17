export type IconName =
  | "chevron-down"
  | "close"
  | "menu"
  | "check"
  | "star"
  | "external-link"
  | "instagram"
  | "facebook"
  | "twitter"
  | "linkedin"
  | "youtube"
  | "phone"
  | "location"
  | "logo"
  | "heart"
  | "briefcase"
  | "cake"
  | "temple"
  | "palette"
  | "music-note"
  | "whatsapp";

export type IconSize = "sm" | "md" | "lg";

export interface IconProps {
  name: IconName;
  size?: IconSize;
  // An accessible name for an icon that conveys real meaning on its own
  // (e.g. a icon-only button). Omit for purely decorative icons — they're
  // hidden from assistive tech by default.
  title?: string;
  className?: string;
}
