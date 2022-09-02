import { Col, Container, Row } from 'react-bootstrap';

function Projects() {
  return (
    <section id="projects">
      <Container fluid>
        <Row>
          <Col>
            <h1 className="display-1 text-center title">Projects</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <p className="text-center m-0">Coming soon...</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <p className="text-center m-0">
              See my GitHub profile{' '}
              <a
                className="align-self-center"
                href="https://github.com/clameater14"
                rel="noopener noreferrer"
                target="_blank"
                color="#FFFFFF"
              >
                <u>here</u>
              </a>
              !
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Projects;
