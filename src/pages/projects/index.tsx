import { Col, Container, Row } from "react-bootstrap";
import ProjectCard from "../../components/ProjectCard";
import Head from "next/head";
import Link from "next/link";
import { NextSeo } from "next-seo";

export const config = {
  runtime: "nodejs",
};

function Projects() {
  return (
    <>
      <NextSeo
        title="Caleb Lam | Projects"
        description="A software developer focused on backend development. See my projects here!"
      />
      <section id="projects">
        <Container className="mb-2 text-center">
          <Row>
            <h1 className="display-1 mb-3 title">Projects</h1>
          </Row>
          <Row>
            <p>This is a work in progress. Stay tuned for more! 😉</p>
          </Row>
          <Row>
            <p className="text-center m-0">
              See my GitHub profile{" "}
              <Link
                className="align-self-center"
                href="https://github.com/clameater14"
                rel="noopener noreferrer"
                target="_blank"
                color="#FFFFFF"
              >
                <u>here</u>
              </Link>
              !
            </p>
          </Row>
          {/* <Row md={4} xs={1} className="g-1 justify-content-center">
            {[...Array(12).fill(1)].map((n, i) => (
              <Col
                key={i}
                md="auto"
                className="d-flex align-items-stretch justify-content-center"
              >
                <ProjectCard
                  title="Test"
                  description="This is a test project to see how a card looks."
                  repoURL="https://github.com/ClamEater14/portfolio-site"
                  prodURL="https://caleblamcodes.dev"
                />
              </Col>
            ))}
            <Col
              md="auto"
              className="d-flex align-items-stretch justify-content-center"
            >
              <ProjectCard
                title="Test"
                description="This is a test project to see how a card looks."
                imageURL="https://www.rd.com/wp-content/uploads/2018/02/30_Adorable-Puppy-Pictures-that-Will-Make-You-Melt_124167640_YamabikaY.jpg?fit=700,467"
              />
            </Col>
            <Col
              md="auto"
              className="d-flex align-items-stretch justify-content-center"
            >
              <ProjectCard
                title="Test"
                description="This is a test project to see how a card looks."
                imageURL="https://toytheater.com/wp-content/uploads/cube.gif"
                repoURL="https://github.com/ClamEater14/portfolio-site"
                prodURL="https://caleblamcodes.dev"
              />
            </Col>
          </Row> */}
        </Container>
      </section>
    </>
  );
}

export default Projects;
