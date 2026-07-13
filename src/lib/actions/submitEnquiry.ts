"use server";

import { sanityWriteClient } from "@/lib/sanity/writeClient";
import { enquiryFormSchema } from "@/lib/validations/enquiry.schema";

export interface SubmitEnquiryResult {
  success: boolean;
  errors?: Record<string, string>;
}

function getString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

// Rate limiting: intentionally not implemented — this project has no
// shared rate-limit store (e.g. Upstash) provisioned yet, and an in-memory
// counter wouldn't survive serverless cold starts or multiple instances.
// Add a real one here if spam becomes a problem in practice.
export async function submitEnquiry(
  formData: FormData,
): Promise<SubmitEnquiryResult> {
  // Honeypot: a field real users never see or fill in (visually hidden,
  // not `display:none`, per the ticket's note that some bots skip
  // CSS-hidden fields). A filled honeypot means a bot — pretend success
  // rather than telling it the submission was rejected.
  if (getString(formData, "company").length > 0) {
    return { success: true };
  }

  const result = enquiryFormSchema.safeParse({
    name: getString(formData, "name"),
    email: getString(formData, "email"),
    phone: getString(formData, "phone"),
    eventType: getString(formData, "eventType"),
    eventDate: getString(formData, "eventDate"),
    expectedGuests: getString(formData, "expectedGuests"),
    message: getString(formData, "message"),
  });

  if (!result.success) {
    const errors: Record<string, string> = {};
    for (const issue of result.error.issues) {
      const field = issue.path[0];
      if (typeof field === "string" && !(field in errors)) {
        errors[field] = issue.message;
      }
    }
    return { success: false, errors };
  }

  await sanityWriteClient.create({
    _type: "enquiry",
    ...result.data,
    submittedAt: new Date().toISOString(),
  });

  return { success: true };
}
