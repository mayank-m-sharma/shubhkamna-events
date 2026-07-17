import { buildWhatsAppUrl } from "./whatsapp";

describe("buildWhatsAppUrl", () => {
  it("strips non-digit characters (leading +, spaces) from the phone number", () => {
    expect(buildWhatsAppUrl("+91 97544 55007")).toBe(
      "https://wa.me/919754455007",
    );
  });

  it("leaves an already-clean digit string untouched", () => {
    expect(buildWhatsAppUrl("919754455007")).toBe("https://wa.me/919754455007");
  });
});
