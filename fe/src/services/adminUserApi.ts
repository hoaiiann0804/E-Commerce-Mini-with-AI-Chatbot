import { api } from './api';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  role: 'customer' | 'admin' | 'manager';
  isEmailVerified: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserResponse {
  status: string;
  data: {
    users: User[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      itemsPerPage: number;
    };
  };
}

export interface UpdateUserRequest {
  id: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  role?: 'customer' | 'admin' | 'manager';
  isEmailVerified?: boolean;
  isActive?: boolean;
}

export interface UserFilters {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
  isEmailVerified?: boolean;
}

export const adminUserApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<UserResponse, UserFilters>({
      query: (params = {}) => {
        const queryParams = new URLSearchParams();

        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            queryParams.append(key, value.toString());
          }
        });

        return `/admin/users?${queryParams.toString()}`;
      },
      providesTags: ['User'],
    }),

    updateUser: builder.mutation<
      { status: string; data: { user: User } },
      UpdateUserRequest
    >({
      query: ({ id, ...userData }) => ({
        url: `/admin/users/${id}`,
        method: 'PUT',
        body: userData,
      }),
      invalidatesTags: ['User'],
    }),

    deleteUser: builder.mutation<{ status: string; message: string }, string>({
      query: (id) => ({
        url: `/admin/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = adminUserApi;
