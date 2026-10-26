import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { hero, site } from "./src/content.ts";

/** Inyecta en index.html el título, la descripción, Open Graph y el JSON-LD a partir de src/content.ts */
function seoFromContent(): Plugin {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ExerciseGym",
    name: site.name,
    description: site.description,
    url: site.url,
    image: `${hero.image}?auto=format&fit=crop&w=1200&h=630&q=70`,
    telephone: site.phone,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: `${site.address.area}, ${site.address.city}`,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "06:00", closes: "23:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "08:00", closes: "20:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "09:00", closes: "14:00" },
    ],
    sameAs: site.socials.map((s) => s.href),
  };
  // Mismas URLs que genera <Img> en el hero (2000×1333): así el preload no descarga una imagen distinta
  const heroSrcSet = [480, 828, 1200, 1600, 2000]
    .map((w) => `${hero.image}?auto=format&fit=crop&w=${w}&h=${Math.round((w * 1333) / 2000)}&q=60 ${w}w`)
    .join(", ");
  const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
  return {
    name: "seo-from-content",
    transformIndexHtml(html) {
      return html
        .replaceAll("%TITLE%", esc(site.title))
        .replaceAll("%DESCRIPTION%", esc(site.description))
        .replaceAll("%URL%", site.url)
        .replaceAll("%OG_IMAGE%", jsonLd.image)
        .replaceAll("%HERO_SRCSET%", esc(heroSrcSet))
        .replace("%JSON_LD%", JSON.stringify(jsonLd).replace(/</g, "\\u003c"));
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), seoFromContent()],
});
