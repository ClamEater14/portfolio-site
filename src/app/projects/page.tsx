import { Metadata } from "next";
import QueryString from "qs";

import { AppConfig } from "../../config/AppConfig";
import { CategoryItem, ProjectCollection, ProjectItem, ProjectsData } from "../../types/ProjectPageTypes";
import ProjectsDisplay from "./ProjectsDisplay";

export type ProjectDataPage = {
  currentPage: number;
  pageSize: number;
  total: number;
  projects: ProjectItem[];
};

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Caleb Lam | Projects",
  description: "A software developer focused on backend development. See my projects here!",
  openGraph: {
    description: "A software developer focused on backend development. See my projects here!",
  },
};

const mapCollectionToItem = (collection: ProjectCollection): ProjectItem => {
  return {
    id: collection.id,
    title: collection.title || "(Untitled)",
    description: collection.description || null,
    imageURL: collection.image?.url || null,
    imageAlt: collection.image?.alternativeText || null,
    repoURL: collection.repoURL || null,
    prodURL: collection.prodURL || null,
    categories:
      collection.categories?.map<CategoryItem>((catCollection): CategoryItem => {
        return {
          id: catCollection.id,
          name: catCollection.name,
          color: catCollection.color,
        };
      }) || [],
  };
};

const getDataFetchParams = () => {
  return QueryString.stringify({
    populate: {
      image: {
        fields: ["url", "alternativeText"],
      },
      categories: {
        fields: ["name", "color"],
      },
    },
    sort: "id",
  });
};

const dataToProps = (d: ProjectsData): ProjectDataPage => {
  return {
    currentPage: d.meta.pagination.page,
    pageSize: d.meta.pagination.pageSize,
    total: d.meta.pagination.total,
    projects: d.data
      .map<ProjectItem>((collection) => mapCollectionToItem(collection))
      .sort((a, b) => a.title.localeCompare(b.title)),
  };
};

const projectsFetcher = (params: string) =>
  fetch(`${AppConfig.apiURL}/projects?${params}`)
    .then(async (res) => {
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new TypeError("Oops, we haven't got JSON!");
      }
      const jsonData = await res.json();
      return jsonData;
    })
    .then((j): ProjectsData => j as ProjectsData)
    .then((d) => dataToProps(d))
    .catch<ProjectDataPage>((err) => {
      console.error(err);
      return dataToProps({
        data: [],
        meta: {
          pagination: {
            page: 1,
            pageSize: 0,
            total: 0,
          },
        },
      });
    });

const getProjects = async () => {
  const apiParams = getDataFetchParams();
  const propsToReturn = await projectsFetcher(apiParams);

  return propsToReturn;
};

export default async function Projects() {
  const dataPage = await getProjects();

  return <ProjectsDisplay dataPage={dataPage} />;
}
