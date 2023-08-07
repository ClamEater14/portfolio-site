"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import ProjectCard from "../../components/ProjectCard";
import ProjectCardCategoryBadge from "../../components/ProjectCard/ProjectCardCategoryBadge";
import { AppConfig } from "../../config/AppConfig";
import { ProjectDataPage } from "./page";

export interface ProjectsDisplayProps {
  dataPage?: ProjectDataPage;
}

export default function ProjectsDisplay({ dataPage }: ProjectsDisplayProps) {
  const router = useRouter();
  const [currPage, setCurrPage] = useState((dataPage?.currentPage ?? 1) - 1);
  const pageCount = Math.ceil((dataPage?.total ?? 0) / AppConfig.cardsPerPage);

  const pagination = (
    <ReactPaginate
      breakClassName={"break-me"}
      pageClassName={"page-item"}
      pageLinkClassName={"page-link bg-dark border-dark"}
      previousClassName={"page-item"}
      previousLinkClassName={"page-link bg-dark border-dark"}
      nextClassName={"page-item"}
      nextLinkClassName={"page-link bg-dark border-dark"}
      disabledClassName={"disabled"}
      activeClassName={"active"}
      containerClassName={"pagination m-0 justify-content-center"}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(nextPageOptions) => {
        setCurrPage(nextPageOptions.selected);
        router.push(`/projects?page=${nextPageOptions.selected + 1}`);
      }}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      forcePage={currPage}
      previousLabel="<"
      renderOnZeroPageCount={() => null}
    />
  );

  const dataList = dataPage ? (
    dataPage.projects.length > 0 ? (
      dataPage?.projects.map((p) => (
        <Col
          key={p.id}
          md="auto"
          className="d-flex align-items-stretch justify-content-center"
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
            </h3>
          </Row>
        </Container>
        <br />
        <Container className="mb-2">{pagination}</Container>
        <Container className="mb-2 h-auto">
          <Row md={4} xs={1} className="g-1 justify-content-center">
            {dataList}
          </Row>
        </Container>
        <Container className="mt-2 mb-4">{pagination}</Container>
      </section>
    </>
  );
}
