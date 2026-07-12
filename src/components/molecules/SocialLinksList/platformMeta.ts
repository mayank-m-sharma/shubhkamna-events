import type { IconName } from "@/types/icon";
import type { SocialLink } from "@/types/siteSettings";

export const platformMeta: Record<
  SocialLink["platform"],
  { icon: IconName; label: string }
> = {
  instagram: { icon: "instagram", label: "Instagram" },
  facebook: { icon: "facebook", label: "Facebook" },
  twitter: { icon: "twitter", label: "Twitter / X" },
  linkedin: { icon: "linkedin", label: "LinkedIn" },
  youtube: { icon: "youtube", label: "YouTube" },
};
