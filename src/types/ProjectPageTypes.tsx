export interface ProjectItem {
  id: number;
  title: string;
  description: string | null;
  prodURL: string | null;
  repoURL: string | null;
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
  attributes: {
    name: string;
    color: string;
  };
}

export interface ProjectCollection {
  id: number;
  attributes: {
    title: string;
    description?: string;
    prodURL?: string;
    repoURL?: string;
    image?: {
      data?: {
        attributes: {
          url: string;
          alternativeText: string;
        };
      };
    };
    categories?: {
      data: CategoryCollection[];
    };
  };
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
