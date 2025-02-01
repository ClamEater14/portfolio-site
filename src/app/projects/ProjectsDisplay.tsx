"use client";

import React from "react";
import { motion } from "motion/react";
import { Col, Container, Row } from "react-bootstrap";

import AnimatedLink from "../../components/Link";
import ProjectCard from "../../components/ProjectCard";
import ProjectCardCategoryBadge from "../../components/ProjectCard/ProjectCardCategoryBadge";
import { ProjectDataPage } from "./page";

export interface ProjectsDisplayProps {
  dataPage?: ProjectDataPage;
}

export default function ProjectsDisplay({ dataPage }: ProjectsDisplayProps) {
  const dataList = dataPage ? (
    dataPage.projects.length > 0 ? (
      dataPage?.projects.map((p, i) => (
        <Col key={p.id} md="auto" className="d-flex align-items-stretch justify-content-center">
          <motion.div
            className="d-flex align-items-stretch justify-content-center"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 1,
              delay: i * 0.2,
              type: "spring",
              stiffness: 75,
            }}
          >
            <ProjectCard
              title={p.title}
              description={p.description || undefined}
              repoURL={p.repoURL || undefined}
              prodURL={p.prodURL || undefined}
              imageURL={p.imageURL || undefined}
              imageAlt={p.imageAlt || undefined}
              key={p.id}
            >
              {p.categories.map((c, i) => (
                <ProjectCardCategoryBadge
                  key={i}
                  categoryId={c.id}
                  categoryColor={c.color || "#FFFFFF"}
                  categoryName={c.name || undefined}
                />
              ))}
            </ProjectCard>
          </motion.div>
        </Col>
      ))
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
        <Container className="mb-2 h-auto">
          <Row md={4} xs={1} className="g-1 justify-content-center">
            {dataList}
          </Row>
        </Container>
      </section>
    </>
  );
}
