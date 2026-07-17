import type { IconName } from "@/types/icon";

export interface ProcessStep {
  icon: IconName;
  title: string;
  description: string;
}

export interface ProcessProps {
  eyebrow?: string;
  heading?: string;
  steps: ProcessStep[];
}
