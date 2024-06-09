"use client";

import { Col, Container, Row, Stack } from "react-bootstrap";
import { Icons } from "../components/Icons";
import Link from "next/link";

const Home: React.FC = () => {
  return (
    <>
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
                <Link
                  className="align-self-center"
                  aria-label="Contact me via email"
                  href="https://linkedin.com/in/caleblam14"
                  rel="noopener noreferrer"
                  target="_blank"
                  color="#FFFFFF"
                >
                  <Icons.LinkedIn size={32} />
                </Link>
                <Link
                  className="align-self-center"
                  aria-label="Contact me via email"
                  href="https://github.com/clameater14"
                  rel="noopener noreferrer"
                  target="_blank"
                  color="#FFFFFF"
                >
                  <Icons.GitHub size={32} />
                </Link>
                <Link
                  className="align-self-center"
                  aria-label="Contact me via email"
                  href="mailto:caleb@caleblamcodes.dev"
                  rel="noopener noreferrer"
                  target="_blank"
                  color="#FFFFFF"
                >
                  <Icons.EnvelopeFill size={32} />
                </Link>
              </Stack>
            </Col>
          </Row>
        </Container>
      </section>
      {/* <section id="skills">
        <Container className="justify-content-center bg-dark" fluid>
          <Row>
            <Col>
              <h1 className="display-1 align-self-center text-center title">
                Skills
              </h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <p className="align-self-center text-center">
                Insert skills here...
              </p>
            </Col>
          </Row>
        </Container>
      </section> */}
    </>
  );
};

export default Home;
