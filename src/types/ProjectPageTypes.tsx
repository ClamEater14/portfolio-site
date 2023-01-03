export interface ProjectItem {
  id: number;
  title: string;
  description: string | null;
  prodURL: string | null;
  repoURL: string | null;
  imageURL: string | null;
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
    CategoryName: string;
    CategoryColor: string;
  };
}

export interface ProjectCollection {
  id: number;
  attributes: {
    Title: string;
    Description?: string;
    ProdURL?: string;
    RepoURL?: string;
    Image?: {
      data?: {
        attributes: {
          url: string;
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
      pageCount: number;
      total: number;
    };
  };
}
