import { api } from './api';
import { WarrantyPackage } from '@/types/product.types';

// Response types
export interface WarrantyPackagesResponse {
  status: string;
  data: {
    warrantyPackages: WarrantyPackage[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}

export interface WarrantyPackageResponse {
  status: string;
  data: WarrantyPackage;
}

// Request types
export interface CreateWarrantyPackageRequest {
  name: string;
  description?: string;
  durationMonths: number;
  price: number;
  terms?: Record<string, any>;
  coverage?: string[];
  isActive?: boolean;
  sortOrder?: number;
}

export interface UpdateWarrantyPackageRequest
  extends CreateWarrantyPackageRequest {
  id: string;
}

export interface WarrantyPackageFilters {
  page?: number;
  limit?: number;
  isActive?: boolean;
}

// API endpoints
export const warrantyApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Get all warranty packages
    getWarrantyPackages: builder.query<
      WarrantyPackagesResponse,
      WarrantyPackageFilters | void
    >({
      query: (filters = {}) => ({
        url: '/warranty-packages',
        params: filters || {},
      }),
      providesTags: ['WarrantyPackages'],
    }),

    // Get warranty package by ID
    getWarrantyPackageById: builder.query<WarrantyPackageResponse, string>({
      query: (id) => `/warranty-packages/${id}`,
      providesTags: (result, error, id) => [{ type: 'WarrantyPackages', id }],
    }),

    // Create warranty package
    createWarrantyPackage: builder.mutation<
      WarrantyPackageResponse,
      CreateWarrantyPackageRequest
    >({
      query: (data) => ({
        url: '/warranty-packages',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['WarrantyPackages'],
    }),

    // Update warranty package
    updateWarrantyPackage: builder.mutation<
      WarrantyPackageResponse,
      UpdateWarrantyPackageRequest
    >({
      query: ({ id, ...data }) => ({
        url: `/warranty-packages/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        'WarrantyPackages',
        { type: 'WarrantyPackages', id },
      ],
    }),

    // Delete warranty package
    deleteWarrantyPackage: builder.mutation<
      { status: string; message: string },
      string
    >({
      query: (id) => ({
        url: `/warranty-packages/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        'WarrantyPackages',
        { type: 'WarrantyPackages', id },
      ],
    }),
  }),
});

// Export hooks
export const {
  useGetWarrantyPackagesQuery,
  useGetWarrantyPackageByIdQuery,
  useCreateWarrantyPackageMutation,
  useUpdateWarrantyPackageMutation,
  useDeleteWarrantyPackageMutation,
} = warrantyApi;
