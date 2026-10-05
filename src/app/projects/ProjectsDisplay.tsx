"use client";

import { motion } from "motion/react";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";

import AnimatedLink from "../../components/Link";
import ProjectCard from "../../components/ProjectCard";
import { ProjectItem } from "../../types/ProjectPageTypes";
import { ProjectDataPage } from "./page";

export interface ProjectsDisplayProps {
  dataPage?: ProjectDataPage;
}

export default function ProjectsDisplay({ dataPage }: ProjectsDisplayProps) {
  const featuredProjects = dataPage?.projects.filter((project) => project.isFeatured) || [];
  const otherProjects = dataPage?.projects.filter((project) => !project.isFeatured) || [];
  const renderProjects = (projects: ProjectItem[]) =>
    projects.map((p) => (
      <Col key={p.id} md="auto" className="d-flex align-items-stretch justify-content-center">
        <motion.div
          className="d-flex align-items-stretch justify-content-center"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <ProjectCard
            title={p.title}
            featured={p.isFeatured}
            description={p.description || undefined}
            links={p.links}
            imageURL={p.imageURL || undefined}
            imageAlt={p.imageAlt || undefined}
            categories={p.categories}
          />
        </motion.div>
      </Col>
    ));

  const dataList = dataPage ? (
    dataPage.projects.length > 0 ? (
      <>
        {featuredProjects.length > 0 && (
          <section aria-labelledby="featured-projects-heading" className="mb-5">
            <h2 id="featured-projects-heading" className="display-3 text-center mb-3">
              Featured Projects
            </h2>
            <Row md={2} xs={1} className="g-1 justify-content-center">
              {renderProjects(featuredProjects)}
            </Row>
          </section>
        )}
        {otherProjects.length > 0 && (
          <section aria-label={featuredProjects.length > 0 ? "More projects" : "Projects"}>
            {featuredProjects.length > 0 && <h2 className="display-3 text-center mb-3">More Projects</h2>}
            <Row md={4} xs={1} className="g-1 justify-content-center">
              {renderProjects(otherProjects)}
            </Row>
          </section>
        )}
      </>
    ) : (
      <h3 className="text-center">Wow! Such empty!</h3>
    )
  ) : (
    <h1 className="text-center">🤔</h1>
  );

  return (
    <>
      <section id="projects">
        <Container className="mb-2 text-center">
          <Row>
            <h1 className="display-1 mb-3 title">Projects</h1>
          </Row>
          <Row>
            <h3 className="text-center m-0">
              See my GitHub profile{" "}
              <AnimatedLink
                className="align-self-center"
                href="https://github.com/clameater14"
                rel="noopener noreferrer"
                target="_blank"
              >
                <u>here</u>
              </AnimatedLink>
              !
            </h3>
          </Row>
        </Container>
        <br />
        <Container className="mb-2 h-auto">{dataList}</Container>
      </section>
    </>
  );
}
