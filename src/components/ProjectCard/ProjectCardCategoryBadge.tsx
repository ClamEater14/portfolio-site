import { Property } from "csstype";
import { useId } from "react";
import { Badge } from "react-bootstrap";

export class ProjectCardCategoryBadgeProps {
  categoryName?: string;
  categoryColor: Property.BackgroundColor = "#FFFFFF";
}

function getTextColorFromBackground(
  bgColor: Property.BackgroundColor
): Property.BackgroundColor {
  const r: number = parseInt(bgColor.substring(1, 3), 16);
  const g: number = parseInt(bgColor.substring(3, 5), 16);
  const b: number = parseInt(bgColor.substring(5, 7), 16);
  const luminosity: number = r * 0.299 + g * 0.587 + b * 0.114;
  return luminosity > 186 ? "black" : "white";
}

export default function ProjectCardCategoryBadge({
  categoryName,
  categoryColor,
}: ProjectCardCategoryBadgeProps) {
  const reactId = useId();
  const id = reactId.substring(1, reactId.length - 1);
  return (
    <>
      <style>
        {`
          #category-badge-${id} {
            background-color: ${categoryColor} !important;
            color: ${getTextColorFromBackground(categoryColor)} !important;
            margin-right: 0.25rem !important;
          }
        `}
      </style>
      <Badge id={`category-badge-${id}`}>{categoryName}</Badge>
    </>
  );
}
