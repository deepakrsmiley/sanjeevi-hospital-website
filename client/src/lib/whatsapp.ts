// Central place for the hospital's WhatsApp number.
// Format: country code + number, no +, no spaces, no leading zeros (E.164 without the "+").
export const HOSPITAL_WHATSAPP_NUMBER = "919363434021";

/**
 * Builds a wa.me click-to-chat link that opens WhatsApp (app or web)
 * with a pre-filled message addressed to the hospital's number.
 */
export function buildWhatsAppLink(message: string, number: string = HOSPITAL_WHATSAPP_NUMBER) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/** Opens the WhatsApp chat in a new tab. */
export function openWhatsApp(message: string, number?: string) {
  const url = buildWhatsAppLink(message, number);
  window.open(url, "_blank", "noopener,noreferrer");
}