// wa.me deep links require digits only (no leading +, spaces, or
// formatting) — the single place that builds one, so every WhatsApp
// affordance (floating button, header, footer) stays in sync.
export function buildWhatsAppUrl(phoneNumber: string): string {
  return `https://wa.me/${phoneNumber.replace(/\D/g, "")}`;
}
