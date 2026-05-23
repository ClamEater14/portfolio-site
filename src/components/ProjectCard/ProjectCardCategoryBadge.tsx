import React from "react";
import { Property } from "csstype";
import { Badge } from "react-bootstrap";

export interface ProjectCardCategoryBadgeProps {
  categoryId: number;
  categoryName?: string;
  categoryColor?: Property.BackgroundColor;
}

// small module-level cache so repeated colors don't recompute
const textColorCache = new Map<string, string>();

function expandShortHex(hex: string) {
  return `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`;
}

function safeGetTextColorFromHex(hexColor: string): string {
  if (textColorCache.has(hexColor)) return textColorCache.get(hexColor)!;

  try {
    let color = hexColor.trim();
    if (color[0] !== "#") throw new Error("not hex");
    if (color.length === 4) color = expandShortHex(color);
    if (color.length !== 7) throw new Error("invalid hex length");

    const r = parseInt(color.substring(1, 3), 16) / 255;
    const g = parseInt(color.substring(3, 5), 16) / 255;
    const b = parseInt(color.substring(5, 7), 16) / 255;

    const sr = r <= 0.04045 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
    const sg = g <= 0.04045 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
    const sb = b <= 0.04045 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);

    const luminance = 0.2126 * sr + 0.7152 * sg + 0.0722 * sb;
    const text = luminance > 0.5 ? "#000000" : "#ffffff";
    textColorCache.set(hexColor, text);
    return text;
  } catch {
    // Fallback: dark text for light-ish keywords, otherwise white.
    const fallback = /white|transparent|none|initial/i.test(hexColor as string) ? "#000000" : "#ffffff";
    textColorCache.set(hexColor, fallback);
    return fallback;
  }
}

export default function ProjectCardCategoryBadge({
  categoryId,
  categoryName,
  categoryColor = "#FFFFFF",
}: ProjectCardCategoryBadgeProps) {
  const bg = (categoryColor as string) || "#FFFFFF";
  const textColor = React.useMemo(() => safeGetTextColorFromHex(bg), [bg]);
  const ref = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Use setProperty with priority to override any stylesheet !important rules
    el.style.setProperty("background-color", bg, "important");
    el.style.setProperty("color", textColor, "important");
  }, [bg, textColor]);

  return (
    <Badge ref={ref} data-category-id={categoryId}>
      {categoryName}
    </Badge>
  );
}
