import Image from "next/image";
import React from "react";
import { Card } from "react-bootstrap";
import { AppConfig } from "../config/AppConfig";
import { Icons } from "./Icons";
import { ProjectCardCategoryBadgeProps } from "./ProjectCardCategoryBadge";

export class ProjectCardProps {
  title: string = "(Project Title)";
  description?: string = "No description.";
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
      bg="dark"
      style={{ width: `${AppConfig.cardWidth}px` }}
    >
      {props.imageURL != undefined ? (
        <Card.Img
          variant="top"
          as={Image}
          src={props.imageURL}
          style={{
            objectFit: "contain",
            padding: "10px",
          }}
          width={AppConfig.cardWidth}
          height={AppConfig.cardHeight}
          alt={props.imageAlt}
          className="img-responsive"
        />
      ) : (
        <Card.Img
          variant="top"
          as="div"
          style={{
            textAlign: "center",
            padding: "10px",
          }}
        >
          <Icons.QuestionMark size={AppConfig.cardHeight - 2 * 10} />
        </Card.Img>
      )}
      <Card.Body className="d-flex flex-column">
        <Card.Title>{props.title}</Card.Title>
        <Card.Subtitle>
          <div className="mb-1">{props.children}</div>
        </Card.Subtitle>
        <Card.Text className="mb-auto">{props.description}</Card.Text>
        <div className="mt-4">
          {props.repoURL != undefined && (
            <Card.Link
              href={props.repoURL}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Icons.GitHub size={24} />
            </Card.Link>
          )}
          {props.prodURL != undefined && (
            <Card.Link
              href={props.prodURL}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Icons.Link45Degrees size={32} />
            </Card.Link>
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
