import { Metadata } from "next";
import QueryString from "qs";
import { AppConfig } from "../../config/AppConfig";
import {
  CategoryItem,
  ProjectCollection,
  ProjectItem,
  ProjectsData,
} from "../../types/ProjectPageTypes";
import ProjectsDisplay from "./ProjectsDisplay";

export type ProjectDataPage = {
  currentPage: number;
  pageSize: number;
  total: number;
  projects: ProjectItem[];
};

export const metadata: Metadata = {
  title: "Caleb Lam | Projects",
  description:
    "A software developer focused on backend development. See my projects here!",
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

const getDataFetchParams = (page: number = 1) => {
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

const dataToProps = (d: ProjectsData): ProjectDataPage => {
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
  fetch(`${AppConfig.apiURL}/projects?${params}`, {
    next: { revalidate: 30 * 1000 },
  })
    .then((res) => res.json())
    .then((j): ProjectsData => j as ProjectsData)
    .then((d) => dataToProps(d));

const getProjects = async (page: number = 1) => {
  const apiParams = getDataFetchParams(page);
  const propsToReturn = await projectsFetcher(apiParams);

  return propsToReturn;
};

export default async function Projects({
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const dataPage = await getProjects(
    searchParams.page
      ? parseInt(
          typeof searchParams.page == "string"
            ? searchParams.page
            : searchParams.page[0]
        )
      : undefined
  );

  return <ProjectsDisplay dataPage={dataPage} />;
}
