import type { ImgHTMLAttributes } from "react";

interface Props extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet"> {
  /** URL base de Unsplash (sin parámetros) */
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Prioridad alta: solo la imagen del hero */
  priority?: boolean;
}

const WIDTHS = [480, 828, 1200, 1600, 2000];

/**
 * Imagen responsive: Unsplash entrega AVIF/WebP (auto=format) al ancho justo vía srcset.
 * width/height reservan el espacio y evitan saltos de layout (CLS).
 */
export function Img({ src, alt, width, height, priority, sizes = "100vw", className = "", ...rest }: Props) {
  const url = (w: number) => `${src}?auto=format&fit=crop&w=${w}&h=${Math.round((w * height) / width)}&q=60`;
  const widths = WIDTHS.filter((w) => w <= width * 2);
  return (
    <img
      src={url(Math.min(width, 1200))}
      srcSet={widths.map((w) => `${url(w)} ${w}w`).join(", ")}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding={priority ? "sync" : "async"}
      className={className}
      {...rest}
    />
  );
}
