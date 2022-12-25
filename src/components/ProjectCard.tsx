import { Card } from "react-bootstrap";
import { Icons } from "./Icons";
import { AppConfig } from "../config/AppConfig";

export class ProjectCardProps {
  title: string = "(Project Title)";
  description: string = "No description.";
  imageURL?: string = undefined;
  prodURL?: string = undefined;
  repoURL?: string = undefined;
}

function ProjectCard(props: ProjectCardProps) {
  return (
    <Card bg="dark" style={{ width: "20rem" }}>
      {props.imageURL != undefined ? (
        <Card.Img
          variant="top"
          src={props.imageURL}
          height={`${AppConfig.cardHeight}px`}
          style={{ objectFit: "cover" }}
          className="img-responsive"
        />
      ) : (
        <Card.Img
          variant="top"
          as="div"
          style={{ textAlign: "center", padding: "10px" }}
        >
          <Icons.QuestionMark size={AppConfig.cardHeight - 2 * 10} />
        </Card.Img>
      )}
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>{props.description}</Card.Text>
        {props.repoURL != undefined && (
          <Card.Link
            href={props.repoURL}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Icons.GitHub size={32} />
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
      </Card.Body>
    </Card>
  );
}

export default ProjectCard;
