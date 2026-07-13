import { enquiryFormSchema } from "./enquiry.schema";

const validInput = {
  name: "Jyoti Bansal",
  phone: "+919754455007",
  eventType: "Wedding",
  eventDate: "2026-12-01",
  message: "Looking for a full wedding planning package.",
};

describe("enquiryFormSchema", () => {
  it("accepts the minimum required fields", () => {
    const result = enquiryFormSchema.safeParse(validInput);

    expect(result.success).toBe(true);
  });

  it("accepts email and expected guests when given", () => {
    const result = enquiryFormSchema.safeParse({
      ...validInput,
      email: "jyoti@example.com",
      expectedGuests: "150",
    });

    expect(result.success).toBe(true);
  });

  it("treats email and expected guests as optional", () => {
    const parsed = enquiryFormSchema.parse({
      ...validInput,
      email: "",
      expectedGuests: "",
    });

    expect(parsed.email).toBe("");
    expect(parsed.expectedGuests).toBe("");
  });

  it("rejects a malformed email address", () => {
    const result = enquiryFormSchema.safeParse({
      ...validInput,
      email: "not-an-email",
    });

    expect(result.success).toBe(false);
  });

  it("rejects a non-numeric expected guests value", () => {
    const result = enquiryFormSchema.safeParse({
      ...validInput,
      expectedGuests: "a lot",
    });

    expect(result.success).toBe(false);
  });

  it("rejects an event type outside the fixed option list", () => {
    const result = enquiryFormSchema.safeParse({
      ...validInput,
      eventType: "Not A Real Event Type",
    });

    expect(result.success).toBe(false);
  });

  it.each(["name", "phone", "eventType", "eventDate", "message"])(
    "rejects a submission missing %s",
    (field) => {
      const rest: Record<string, string> = { ...validInput };
      delete rest[field];

      const result = enquiryFormSchema.safeParse(rest);

      expect(result.success).toBe(false);
    },
  );

  it("surfaces a human-readable message for a missing name", () => {
    const rest: Record<string, string> = { ...validInput };
    delete rest.name;

    const result = enquiryFormSchema.safeParse(rest);

    expect(result.success).toBe(false);
    const error = (
      result as { success: false; error: { issues: { message: string }[] } }
    ).error;
    expect(error.issues[0]?.message).toBe("Please enter your name.");
  });
});
