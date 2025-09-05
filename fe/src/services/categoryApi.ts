import { api } from './api';
import { Category } from '@/types/category.types';

export interface CategoryResponse {
  status: string;
  data: Category[] | Category;
}

export interface CreateCategoryRequest {
  name: string;
  description?: string;
  image?: string;
  parentId?: string | null;
  isActive?: boolean;
  sortOrder?: number;
}

export interface UpdateCategoryRequest extends CreateCategoryRequest {
  id: string;
}

export const categoryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query<CategoryResponse, void>({
      query: () => '/categories',
      providesTags: ['Category'],
    }),

    getCategoryTree: builder.query<CategoryResponse, void>({
      query: () => '/categories/tree',
      providesTags: ['Category'],
    }),

    getCategoryById: builder.query<CategoryResponse, string>({
      query: (id) => `/categories/${id}`,
      providesTags: (_, __, id) => [{ type: 'Category', id }],
    }),

    getCategoryBySlug: builder.query<CategoryResponse, string>({
      query: (slug) => `/categories/slug/${slug}`,
      providesTags: (_, __, slug) => [{ type: 'Category', id: slug }],
    }),

    createCategory: builder.mutation<CategoryResponse, CreateCategoryRequest>({
      query: (category) => ({
        url: '/categories',
        method: 'POST',
        body: category,
      }),
      invalidatesTags: ['Category'],
    }),

    updateCategory: builder.mutation<CategoryResponse, UpdateCategoryRequest>({
      query: ({ id, ...category }) => ({
        url: `/categories/${id}`,
        method: 'PUT',
        body: category,
      }),
      invalidatesTags: (_, __, { id }) => [
        'Category',
        { type: 'Category', id },
      ],
    }),

    deleteCategory: builder.mutation<
      { status: string; message: string },
      string
    >({
      query: (id) => ({
        url: `/categories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Category'],
    }),

    getProductsByCategory: builder.query<
      any,
      {
        id: string;
        page?: number;
        limit?: number;
        sort?: string;
        order?: 'ASC' | 'DESC';
      }
    >({
      query: ({
        id,
        page = 1,
        limit = 10,
        sort = 'createdAt',
        order = 'DESC',
      }) =>
        `/categories/${id}/products?page=${page}&limit=${limit}&sort=${sort}&order=${order}`,
      providesTags: (_, __, { id }) => [
        { type: 'Product', id: `category-${id}` },
      ],
    }),

    getFeaturedCategories: builder.query<CategoryResponse, void>({
      query: () => '/categories/featured',
      providesTags: ['Category'],
    }),

    // Giữ lại các endpoint cũ để tương thích với code hiện tại
    getCategories: builder.query<Category[], void>({
      query: () => '/categories',
      transformResponse: (response: CategoryResponse) => {
        return Array.isArray(response.data) ? response.data : [response.data];
      },
      providesTags: ['Category'],
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useGetCategoryTreeQuery,
  useGetCategoryByIdQuery,
  useGetCategoryBySlugQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetProductsByCategoryQuery,
  useGetFeaturedCategoriesQuery,
  // Giữ lại các hooks cũ để tương thích với code hiện tại
  useGetCategoriesQuery,
} = categoryApi;
