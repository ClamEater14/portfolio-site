import { Container, Row, Col, Stack } from "react-bootstrap";
import { Icons } from "../Icons";
import IconLink from "../Link/IconLink";

const AboutSection = () => {
  return (
    <section id="about">
      <Container
        className="justify-content-center d-flex flex-column vh-100 offset-header"
        fluid
      >
        <Row className="align-self-center">
          <Col className="align-self-center">
            <h1 className="display-1 align-self-center text-center title m-0">
              Caleb Lam
            </h1>
          </Col>
        </Row>
        <Row className="align-self-center">
          <Col className="align-self-center">
            <h2 className="align-self-center text-center">
              Software Developer
            </h2>
          </Col>
        </Row>
        <Row className="align-self-center">
          <Col className="align-self-center">
            <h2 className="align-self-center text-center mb-3">
              Backend | Full-Stack
            </h2>
          </Col>
        </Row>
        <Row className="align-self-center">
          <Col className="align-self-center">
            <Stack
              direction="horizontal"
              gap={3}
              className="justify-content-center align-self-center m-1"
            >
              <IconLink
                className="align-self-center enlarge-on-hover"
                ariaLabel="Contact me via LinkedIn"
                href="https://linkedin.com/in/caleblam14"
                rel="noopener noreferrer"
                target="_blank"
                enlargeOnHover
                icon={Icons.LinkedIn}
              />
              <IconLink
                className="align-self-center enlarge-on-hover"
                ariaLabel="Contact me via GitHub"
                href="https://github.com/clameater14"
                rel="noopener noreferrer"
                target="_blank"
                enlargeOnHover
                icon={Icons.GitHub}
              />
              <IconLink
                className="align-self-center"
                ariaLabel="Contact me via email"
                href="mailto:caleb@caleblamcodes.dev"
                rel="noopener noreferrer"
                target="_blank"
                enlargeOnHover
                icon={Icons.EnvelopeFill}
              />
            </Stack>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutSection;
