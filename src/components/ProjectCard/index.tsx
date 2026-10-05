import React from "react";
import { Card, Stack } from "react-bootstrap";

import { AppConfig } from "../../config/AppConfig";
import type { ProjectLinkCollection } from "../../types/ProjectLinkTypes";
import { CategoryItem } from "../../types/ProjectPageTypes";
import * as Icons from "../Icons";
import AnimatedIconLink from "../Link/IconLink";
import { getProjectLinkIcon } from "./linkIcons";
import ProjectCardCategoryBadge from "./ProjectCardCategoryBadge";
import ProjectCardImage from "./ProjectCardImage";

export class ProjectCardProps {
  title: string = "(Project Title)";
  featured?: boolean = false;
  description?: string = "";
  imageURL?: string = undefined;
  imageAlt?: string = undefined;
  links?: ProjectLinkCollection[];
  categories?: CategoryItem[];
}

function ProjectCard(props: ProjectCardProps) {
  const links = props.links || [];

  return (
    <Card
      className="position-relative"
      style={{
        width: `${props.featured ? AppConfig.cardFeaturedWidth : AppConfig.cardDefaultWidth}px`,
        borderColor: props.featured ? AppConfig.primaryColor : undefined,
      }}
    >
      <Card.Header>
        <Card.Img
          variant="top"
          as={ProjectCardImage}
          alt={props.imageAlt}
          src={props.imageURL}
          width={AppConfig.cardImageWidth}
          height={AppConfig.cardImageHeight}
          style={{
            objectFit: "contain",
            padding: `${AppConfig.cardImagePadding}px`,
          }}
          noImageElement={
            <div
              style={{
                textAlign: "center",
                padding: "10px",
              }}
            >
              <Icons.QuestionMark size={AppConfig.cardImageHeight - 2 * 10} />
            </div>
          }
          placeholderElement={
            <div
              style={{
                textAlign: "center",
                padding: "10px",
              }}
            >
              <Icons.HourglassSplit size={AppConfig.cardImageHeight - 2 * 10} />
            </div>
          }
        />

        <Card.Title className="text-center">{props.title}</Card.Title>
      </Card.Header>
      <Card.Body className="d-flex flex-column">
        <Card.Subtitle>
          <div className="mb-1 d-flex flex-wrap gap-1 justify-content-center">
            {props.categories?.map((category) => (
              <ProjectCardCategoryBadge
                categoryId={category.id}
                key={category.id}
                categoryColor={category.color || "#FFFFFF"}
                categoryName={category.name || "<Unknown>"}
              />
            ))}
          </div>
        </Card.Subtitle>
        <Card.Text className="mb-auto" style={{ whiteSpace: "pre-line" }}>
          {props.description}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <Stack direction="vertical" gap={2} className="align-items-start">
          {links.map((link) => (
            <div key={link.id} className="mw-100" style={{ minWidth: 0 }}>
              <Card.Link
                as={AnimatedIconLink}
                className="d-inline-flex mw-100"
                href={link.url}
                ariaLabel={link.label}
                label={link.label}
                rel="noopener noreferrer"
                target="_blank"
                icon={getProjectLinkIcon(link.icon)}
                iconSize={32}
              />
            </div>
          ))}
          {links.length === 0 && (
            <Card.Link as="div">
              <Icons.XSquareFill size={32} />
              <span className="m-2 align-middle">No links available</span>
            </Card.Link>
          )}
        </Stack>
      </Card.Footer>
    </Card>
  );
}

export default ProjectCard;
