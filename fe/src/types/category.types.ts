// Category Types
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string | null;
  level: number;
  isActive: boolean;
  sortOrder?: number;
  children?: Category[];
  productCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CategoriesResponse {
  categories: Category[];
  total: number;
}

export interface CategoryFilters {
  parentId?: string;
  isActive?: boolean;
  search?: string;
}
