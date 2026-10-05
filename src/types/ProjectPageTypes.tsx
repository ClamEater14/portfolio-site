import type { ProjectLinkCollection } from "./ProjectLinkTypes";

export interface ProjectItem {
  id: number;
  title: string;
  isFeatured: boolean;
  description: string | null;
  links: ProjectLinkCollection[];
  imageURL: string | null;
  imageAlt: string | null;
  categories: CategoryItem[];
}

export interface CategoryItem {
  id: number;
  name: string | null;
  color: string | null;
}

export interface CategoryCollection {
  id: number;
  name: string;
  color: string;
}

export interface ProjectCollection {
  id: number;
  documentId: string;
  title: string;
  isFeatured?: boolean;
  description?: string;
  links?: ProjectLinkCollection[];
  image?: {
    url: string;
    alternativeText: string;
  };
  categories?: CategoryCollection[];
}

export interface ProjectsData {
  data: ProjectCollection[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      total: number;
    };
  };
}
