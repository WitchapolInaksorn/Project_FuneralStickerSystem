import { useEffect, useState } from "react";

const hexToRgb = (hex) => {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

export default function useTintedTemplate(src, color) {
  const [tinted, setTinted] = useState(src);

  useEffect(() => {
    if (!color) {
      setTinted(src);
      return;
    }

    let cancelled = false;
    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const px = imageData.data;
      const [r, g, b] = hexToRgb(color);

      for (let i = 0; i < px.length; i += 4) {
        const lum =
          (px[i] * 0.299 + px[i + 1] * 0.587 + px[i + 2] * 0.114) / 255;
        const darkness = Math.min(1, (1 - lum) * 1.35);
        const alpha = darkness * (px[i + 3] / 255);

        px[i] = r;
        px[i + 1] = g;
        px[i + 2] = b;
        px[i + 3] = Math.round(alpha * 255);
      }

      ctx.putImageData(imageData, 0, 0);
      if (!cancelled) setTinted(canvas.toDataURL("image/png"));
    };

    img.src = src;
    return () => {
      cancelled = true;
    };
  }, [src, color]);

  return tinted;
}
