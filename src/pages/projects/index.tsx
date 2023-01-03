import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";
import ProjectCard from "../../components/ProjectCard";
import { AppConfig } from "../../config/AppConfig";
import {
  CategoryItem,
  ProjectItem,
  ProjectsData,
} from "../../types/ProjectPageTypes";
import ProjectCardCategoryBadge from "../../components/ProjectCardCategoryBadge";

type ProjectsPageProps = {
  projects: ProjectItem[];
  currentPage: number;
  pageSize: number;
};

function Projects(props: ProjectsPageProps) {
  const { projects } = props;

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
        <Container className="mb-2">
          <br />
          <Row md={4} xs={1} className="g-1 justify-content-center">
            {projects.map((p) => (
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
                  key={p.id}
                >
                  {p.categories.map((c, i) => (
                    <ProjectCardCategoryBadge
                      key={i}
                      categoryColor={c.color || "#FFFFFF"}
                      categoryName={c.name || undefined}
                    />
                  ))}
                </ProjectCard>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<ProjectsPageProps> = async (
  context
) => {
  const params = [
    "populate[Image][fields][0]=url",
    "populate[categories][fields][0]=CategoryName",
    "populate[categories][fields][1]=CategoryColor",
    `pagination[pageSize]=${AppConfig.cardsPerPage}`,
    `pagination[page]=${
      parseInt(context.params?.page?.toString() || "1") ?? 1
    }`,
  ];
  const paramsStr = params.join("&");
  const res = await fetch(`${AppConfig.apiURL}/projects?${paramsStr}`, {
    headers: {
      Authorization: `bearer ${process.env.STRAPI_TOKEN}`,
    },
  });
  const data = (await res.json()) as ProjectsData;

  return {
    props: {
      currentPage: data.meta.pagination.page,
      pageSize: data.meta.pagination.pageSize,
      projects: data.data.map<ProjectItem>((collection): ProjectItem => {
        return {
          id: collection.id,
          title: collection.attributes.Title || "(Untitled)",
          description: collection.attributes.Description || null,
          imageURL: collection.attributes.Image?.data?.attributes.url || null,
          repoURL: collection.attributes.RepoURL || null,
          prodURL: collection.attributes.ProdURL || null,
          categories:
            collection.attributes.categories?.data.map<CategoryItem>(
              (catCollection): CategoryItem => {
                return {
                  id: catCollection.id,
                  name: catCollection.attributes.CategoryName || null,
                  color: catCollection.attributes.CategoryColor || null,
                };
              }
            ) || [],
        };
      }),
    },
  };
};

export default Projects;
