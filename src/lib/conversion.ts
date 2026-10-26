// Conversión: enlaces a WhatsApp y eventos de analítica.
import { site } from "../content";

/** Enlace de WhatsApp con el mensaje precargado */
export const waLink = (message: string) => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;

/**
 * Punto único para registrar conversiones. Se llama en cada clic a WhatsApp y en el envío del formulario.
 * Descomentá los proveedores que uses (y agregá sus scripts en index.html).
 */
export function track(event: "whatsapp_click" | "form_submit", params: Record<string, string> = {}) {
  // Meta Pixel:
  // window.fbq?.("track", event === "form_submit" ? "Lead" : "Contact", params);
  //
  // Google Analytics 4:
  // window.gtag?.("event", event === "form_submit" ? "generate_lead" : "contact", { method: "whatsapp", ...params });
  if (import.meta.env.DEV) console.info("[track]", event, params);
}

/** Abre WhatsApp en una pestaña nueva y registra el evento */
export function openWhatsApp(message: string, source: string) {
  track("whatsapp_click", { source });
  window.open(waLink(message), "_blank", "noopener");
}
