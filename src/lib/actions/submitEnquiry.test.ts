import { sanityWriteClient } from "@/lib/sanity/writeClient";

import { submitEnquiry } from "./submitEnquiry";

jest.mock("@/lib/sanity/writeClient", () => ({
  sanityWriteClient: {
    create: jest.fn().mockResolvedValue({ _id: "enquiry-1" }),
  },
}));

function buildFormData(overrides: Record<string, string> = {}): FormData {
  const defaults: Record<string, string> = {
    name: "Jyoti Bansal",
    email: "",
    phone: "+919754455007",
    eventType: "Wedding",
    eventDate: "2026-12-01",
    expectedGuests: "",
    message: "Looking for a full wedding planning package.",
    company: "",
  };
  const data = new FormData();
  for (const [key, value] of Object.entries({ ...defaults, ...overrides })) {
    data.set(key, value);
  }
  return data;
}

describe("submitEnquiry", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("creates an enquiry document from a valid submission", async () => {
    const result = await submitEnquiry(buildFormData());

    expect(result.success).toBe(true);
    expect(sanityWriteClient.create).toHaveBeenCalledWith(
      expect.objectContaining({
        _type: "enquiry",
        name: "Jyoti Bansal",
        phone: "+919754455007",
        eventType: "Wedding",
      }),
    );
  });

  it("returns field errors and does not write to Sanity for an invalid submission", async () => {
    const result = await submitEnquiry(buildFormData({ name: "" }));

    expect(result.success).toBe(false);
    expect(result.errors?.name).toBeTruthy();
    expect(sanityWriteClient.create).not.toHaveBeenCalled();
  });

  it("silently pretends success and never writes when the honeypot field is filled", async () => {
    const result = await submitEnquiry(
      buildFormData({ company: "I am a bot" }),
    );

    expect(result.success).toBe(true);
    expect(sanityWriteClient.create).not.toHaveBeenCalled();
  });

  it("rejects an event type outside the fixed option list", async () => {
    const result = await submitEnquiry(
      buildFormData({ eventType: "Not A Real Type" }),
    );

    expect(result.success).toBe(false);
    expect(result.errors?.eventType).toBeTruthy();
  });
});
