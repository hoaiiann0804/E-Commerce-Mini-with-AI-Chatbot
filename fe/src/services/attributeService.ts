import apiClient from './apiClient';

export interface NamePreviewRequest {
  baseName: string;
  selectedAttributes: string[];
  separator?: string;
  includeDetails?: boolean;
}

export interface NameGenerationRequest {
  baseName: string;
  attributeValues: Record<string, string>;
  productId?: string;
  separator?: string;
  includeDetails?: boolean;
}

export interface NamePreviewResponse {
  originalName: string;
  generatedName: string;
  hasChanges: boolean;
  parts: string[];
  affectingAttributes: Array<{
    id: string;
    name: string;
    nameTemplate: string;
    groupName: string;
    groupType: string;
  }>;
  suggestions: string[];
  timestamp: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export interface AttributeGroup {
  id: string;
  name: string;
  type: string;
  description?: string;
  isRequired?: boolean;
  sortOrder?: number;
  isActive?: boolean;
}

export interface AttributeValue {
  id: string;
  attributeGroupId: string;
  name: string;
  value: string;
  colorCode?: string;
  imageUrl?: string;
  priceAdjustment?: number;
  sortOrder?: number;
  isActive?: boolean;
  affectsName?: boolean;
  nameTemplate?: string;
  attributeGroup?: AttributeGroup;
}

class AttributeService {
  // Preview product name with selected attributes
  async previewProductName(
    request: NamePreviewRequest
  ): Promise<ApiResponse<NamePreviewResponse>> {
    const response = await apiClient.post('/attributes/preview-name', request);
    return response.data;
  }

  // Generate name in real-time for dynamic forms
  async generateNameRealTime(
    request: NameGenerationRequest
  ): Promise<ApiResponse<NamePreviewResponse>> {
    const response = await apiClient.post(
      '/attributes/generate-name-realtime',
      request
    );
    return response.data;
  }

  // Get all attributes that can affect product names
  async getNameAffectingAttributes(
    productId?: string
  ): Promise<ApiResponse<AttributeValue[]>> {
    const params = productId ? { productId } : {};
    const response = await apiClient.get('/attributes/name-affecting', {
      params,
    });
    return response.data;
  }

  // Batch generate names for multiple products
  async batchGenerateNames(
    items: Array<{
      id: string;
      baseName: string;
      selectedAttributes: string[];
    }>,
    separator?: string
  ): Promise<
    ApiResponse<
      Array<{
        id: string;
        baseName: string;
        generatedName: string;
        selectedAttributes: string[];
      }>
    >
  > {
    const response = await apiClient.post('/attributes/batch-generate-names', {
      items,
      separator: separator || ' ',
    });
    return response.data;
  }

  // Get all attribute groups with values
  async getAttributeGroups(): Promise<ApiResponse<any[]>> {
    const response = await apiClient.get('/attributes/groups');
    return response.data;
  }

  // Get attribute groups for specific product
  async getProductAttributeGroups(
    productId: string
  ): Promise<ApiResponse<any[]>> {
    const response = await apiClient.get(
      `/attributes/products/${productId}/groups`
    );
    return response.data;
  }

  // Create new attribute group
  async createAttributeGroup(data: {
    name: string;
    type: string;
    description?: string;
    isRequired?: boolean;
    sortOrder?: number;
  }): Promise<ApiResponse<any>> {
    const response = await apiClient.post('/attributes/groups', data);
    return response.data;
  }

  // Add attribute value to group
  async addAttributeValue(
    attributeGroupId: string,
    data: {
      name: string;
      value: string;
      colorCode?: string;
      imageUrl?: string;
      priceAdjustment?: number;
      sortOrder?: number;
      affectsName?: boolean;
      nameTemplate?: string;
    }
  ): Promise<ApiResponse<any>> {
    const response = await apiClient.post(
      `/attributes/groups/${attributeGroupId}/values`,
      data
    );
    return response.data;
  }

  // Update attribute value
  async updateAttributeValue(
    id: string,
    data: {
      name?: string;
      value?: string;
      colorCode?: string;
      imageUrl?: string;
      priceAdjustment?: number;
      sortOrder?: number;
      isActive?: boolean;
      affectsName?: boolean;
      nameTemplate?: string;
    }
  ): Promise<ApiResponse<any>> {
    const response = await apiClient.put(`/attributes/values/${id}`, data);
    return response.data;
  }

  // Update attribute group
  async updateAttributeGroup(
    id: string,
    data: {
      name?: string;
      description?: string;
      type?: string;
      isRequired?: boolean;
      sortOrder?: number;
      isActive?: boolean;
    }
  ): Promise<ApiResponse<any>> {
    const response = await apiClient.put(`/attributes/groups/${id}`, data);
    return response.data;
  }

  // Delete attribute group
  async deleteAttributeGroup(id: string): Promise<ApiResponse<any>> {
    const response = await apiClient.delete(`/attributes/groups/${id}`);
    return response.data;
  }

  // Delete attribute value
  async deleteAttributeValue(id: string): Promise<ApiResponse<any>> {
    const response = await apiClient.delete(`/attributes/values/${id}`);
    return response.data;
  }

  // Assign attribute group to product
  async assignAttributeGroupToProduct(
    productId: string,
    attributeGroupId: string,
    data: {
      isRequired?: boolean;
      sortOrder?: number;
    }
  ): Promise<ApiResponse<any>> {
    const response = await apiClient.post(
      `/attributes/products/${productId}/groups/${attributeGroupId}`,
      data
    );
    return response.data;
  }
}

export const attributeService = new AttributeService();
export default attributeService;
