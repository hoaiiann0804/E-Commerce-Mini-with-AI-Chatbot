// Cart Types
export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  attributes?: Record<string, string>; // For variants like size, color, etc.
  variantId?: string;
  inStock?: boolean;
  stockQuantity?: number;
  cartId?: string;
  warrantyPackageIds?: string[]; // For warranty packages
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
  isLoading: boolean;
  totalItems: number;
  subtotal: number;
  serverCart: ServerCart | null;
}

export interface ServerCart {
  id: string | null;
  items: ServerCartItem[];
  totalItems: number;
  subtotal: number;
}

export interface ServerCartItem {
  id: string;
  cartId: string;
  productId: string;
  variantId?: string;
  quantity: number;
  price: number;
  Product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    thumbnail: string;
    inStock: boolean;
    stockQuantity: number;
  };
  ProductVariant?: {
    id: string;
    name: string;
    price: number;
    stockQuantity: number;
  };
}

export interface AddToCartPayload {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  attributes?: Record<string, string>;
  variantId?: string;
  warrantyPackageIds?: string[];
}

export interface UpdateCartItemPayload {
  id: string;
  quantity: number;
}
