import Link from "next/link";
import { Container, Row, Col, Button } from "react-bootstrap";

const ProjectLinkSection = () => {
  return (
    <section id="projects">
      <Container className="justify-content-center" fluid>
        <Row>
          <Col>
            <h1 className="display-1 align-self-center text-center title">
              Projects
            </h1>
          </Col>
        </Row>
        <Row>
          <Col className="m-5">
            <Container className="d-flex justify-content-center">
              <Link href="/projects">
                {/* TODO: use React-Bootstrap's button */}
                <button className="btn btn-primary">
                  <span className="display-2">View Projects</span>
                </button>
              </Link>
            </Container>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ProjectLinkSection;
