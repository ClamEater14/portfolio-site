import React from "react";
import { Card, Stack } from "react-bootstrap";

import { AppConfig } from "../../config/AppConfig";
import { CategoryItem } from "../../types/ProjectPageTypes";
import * as Icons from "../Icons";
import AnimatedIconLink from "../Link/IconLink";
import ProjectCardCategoryBadge from "./ProjectCardCategoryBadge";
import ProjectCardImage from "./ProjectCardImage";

export class ProjectCardProps {
  title: string = "(Project Title)";
  description?: string = "";
  imageURL?: string = undefined;
  imageAlt?: string = undefined;
  prodURL?: string = undefined;
  repoURL?: string = undefined;
  categories?: CategoryItem[];
}

function ProjectCard(props: ProjectCardProps) {
  return (
    <Card className="position-relative" style={{ width: `${AppConfig.cardImageWidth}px` }}>
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
          <div className="mb-1">
            {props.categories?.map((category, i) => (
              <ProjectCardCategoryBadge
                categoryId={category.id}
                key={i}
                categoryColor={category.color || "#FFFFFF"}
                categoryName={category.name || "<Unknown>"}
              />
            ))}
          </div>
        </Card.Subtitle>
        <Card.Text className="mb-auto">{props.description}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <Stack direction="horizontal" gap={2}>
          {props.repoURL != undefined && (
            <Card.Link
              as={AnimatedIconLink}
              href={props.repoURL}
              rel="noopener noreferrer"
              target="_blank"
              icon={Icons.GitHub}
              iconSize={32}
            />
          )}
          {props.prodURL != undefined && (
            <Card.Link
              as={AnimatedIconLink}
              href={props.prodURL}
              rel="noopener noreferrer"
              target="_blank"
              icon={Icons.Link45Degrees}
              iconSize={32}
            />
          )}
          {props.prodURL == undefined && props.repoURL == undefined && (
            <Card.Link as="div">
              <Icons.XSquareFill size={32} />
              <span className="m-2 align-middle">No link available.</span>
            </Card.Link>
          )}
        </Stack>
      </Card.Footer>
    </Card>
  );
}

export default ProjectCard;
