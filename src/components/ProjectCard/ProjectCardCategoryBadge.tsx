import React from "react";
import { Property } from "csstype";
import { Badge } from "react-bootstrap";

export interface ProjectCardCategoryBadgeProps {
  categoryId: number;
  categoryName?: string;
  categoryColor?: Property.BackgroundColor;
}

function getTextColorFromBackground(bgColor: Property.BackgroundColor): Property.BackgroundColor {
  const color = bgColor.substring(1); // Remove the leading '#'
  if (color.length !== 6) {
    throw new Error("Invalid color format. Expected full hex color format.");
  }

  // Get sRGB values
  const colorR = parseInt(color.substring(0, 2), 16) / 255;
  const colorG = parseInt(color.substring(2, 4), 16) / 255;
  const colorB = parseInt(color.substring(4, 6), 16) / 255;

  // Determine luminance RGB factors
  const r = colorR <= 0.04045 ? colorR / 12.92 : Math.pow((colorR + 0.055) / 1.055, 2.4);
  const g = colorG <= 0.04045 ? colorG / 12.92 : Math.pow((colorG + 0.055) / 1.055, 2.4);
  const b = colorB <= 0.04045 ? colorB / 12.92 : Math.pow((colorB + 0.055) / 1.055, 2.4);

  // Calculate relative luminance
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  return luminance > 0.5 ? "#000000" : "#ffffff"; // Return black or white based on luminance
}

export default function ProjectCardCategoryBadge({
  categoryId,
  categoryName,
  categoryColor = "#FFFFFF",
}: ProjectCardCategoryBadgeProps) {
  return (
    <>
      <style>
        {`
          .category-badge-${categoryId} {
            background-color: ${categoryColor} !important;
            color: ${getTextColorFromBackground(categoryColor)} !important;
            margin-right: 0.25rem !important;
          }
        `}
      </style>
      <Badge className={`category-badge-${categoryId}`}>{categoryName}</Badge>
    </>
  );
}
