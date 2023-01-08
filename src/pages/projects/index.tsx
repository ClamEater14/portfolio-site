import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { useRouter } from "next/router";
import QueryString from "qs";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import ProjectCard from "../../components/ProjectCard";
import ProjectCardCategoryBadge from "../../components/ProjectCardCategoryBadge";
import { AppConfig } from "../../config/AppConfig";
import {
  CategoryItem,
  ProjectCollection,
  ProjectItem,
  ProjectsData,
} from "../../types/ProjectPageTypes";
import useSWRWithFallbackData from "../../utils/swr-with-fallback";

type ProjectsPageProps = {
  currentPage: number;
  pageSize: number;
  total: number;
  projects: ProjectItem[];
};

const mapCollectionToItem = (collection: ProjectCollection): ProjectItem => {
  return {
    id: collection.id,
    title: collection.attributes.title || "(Untitled)",
    description: collection.attributes.description || null,
    imageURL: collection.attributes.image?.data?.attributes.url || null,
    imageAlt:
      collection.attributes.image?.data?.attributes.alternativeText || null,
    repoURL: collection.attributes.repoURL || null,
    prodURL: collection.attributes.prodURL || null,
    categories:
      collection.attributes.categories?.data.map<CategoryItem>(
        (catCollection): CategoryItem => {
          return {
            id: catCollection.id,
            name: catCollection.attributes.name,
            color: catCollection.attributes.color,
          };
        }
      ) || [],
  };
};

const getParams = (page: number = 1) => {
  return QueryString.stringify({
    populate: {
      image: {
        fields: ["url", "alternativeText"],
      },
      categories: {
        fields: ["name", "color"],
      },
    },
    pagination: {
      page: page,
      pageSize: AppConfig.cardsPerPage,
    },
    sort: "id",
  });
};

const dataToProps = (d: ProjectsData): ProjectsPageProps => {
  return {
    currentPage: d.meta.pagination.page,
    pageSize: d.meta.pagination.pageSize,
    total: d.meta.pagination.total,
    projects: d.data.map<ProjectItem>((collection) =>
      mapCollectionToItem(collection)
    ),
  };
};

const projectsFetcher = (params: string) =>
  fetch(`${AppConfig.apiURL}/projects?${params}`)
    .then((res) => res.json())
    .then((j): ProjectsData => j as ProjectsData)
    .then((d) => dataToProps(d));

function Projects(initialProps: ProjectsPageProps) {
  const router = useRouter();
  const { data, error } = useSWRWithFallbackData<
    ProjectsPageProps,
    any,
    string
  >(getParams(initialProps.currentPage), projectsFetcher, {
    revalidateOnMount: false,
    revalidateOnFocus: false,
    refreshInterval: 30 * 1000,
    fallbackData: initialProps,
    onSuccess: () => console.log(`Data refreshed at ${new Date().toString()}!`),
  });

  const [currPage, setCurrPage] = useState(initialProps.currentPage - 1);
  const pageCount = Math.ceil((data?.total || 0) / AppConfig.cardsPerPage);

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

  useEffect(() => {
    setCurrPage((data?.currentPage || initialProps.currentPage) - 1);
  }, [currPage, data?.currentPage, initialProps.currentPage]);

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
        <br />
        <Container className="mb-2">{pagination}</Container>
        <Container className="mb-2 h-auto">
          <Row md={4} xs={1} className="g-1 justify-content-center">
            {data ? (
              data.projects.length > 0 ? (
                data?.projects.map((p) => (
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
            )}
          </Row>
        </Container>
        <Container className="mt-2 mb-4">{pagination}</Container>
      </section>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<ProjectsPageProps> = async (
  context
) => {
  const { page } = context.query;
  const apiParams = getParams(parseInt(page?.toString() || "1"));
  const propsToReturn = await projectsFetcher(apiParams);

  return {
    props: propsToReturn,
  };
};

export default Projects;
