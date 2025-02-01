import React from "react";
import { Card } from "react-bootstrap";
import { AppConfig } from "../../config/AppConfig";
import { Icons } from "../Icons";
import { ProjectCardCategoryBadgeProps } from "./ProjectCardCategoryBadge";
import ProjectCardImage from "./ProjectCardImage";
import AnimatedIconLink from "../Link/IconLink";

export class ProjectCardProps {
  title: string = "(Project Title)";
  description?: string = "";
  imageURL?: string = undefined;
  imageAlt?: string = undefined;
  prodURL?: string = undefined;
  repoURL?: string = undefined;
  children?:
    | React.ReactElement<ProjectCardCategoryBadgeProps>
    | React.ReactElement<ProjectCardCategoryBadgeProps>[];
}

function ProjectCard(props: ProjectCardProps) {
  return (
    <Card
      className="position-relative"
      style={{ width: `${AppConfig.cardImageWidth}px` }}
    >
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
      <Card.Body className="d-flex flex-column">
        <Card.Title>{props.title}</Card.Title>
        <Card.Subtitle>
          <div className="mb-1">{props.children}</div>
        </Card.Subtitle>
        <Card.Text className="mb-auto">{props.description}</Card.Text>
        <div className="mt-4">
          {props.repoURL != undefined && (
            <AnimatedIconLink
              href={props.repoURL}
              rel="noopener noreferrer"
              target="_blank"
              icon={Icons.GitHub}
              iconSize={32}
            />
          )}
          {props.prodURL != undefined && (
            <AnimatedIconLink
              href={props.prodURL}
              rel="noopener noreferrer"
              target="_blank"
              icon={Icons.Link45Degrees}
              iconSize={24}
            />
          )}
          {props.prodURL == undefined && props.repoURL == undefined && (
            <Card.Link as="div">
              <Icons.XSquareFill size={32} />
              <span className="m-2 align-middle">No link available.</span>
            </Card.Link>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProjectCard;
