import { ProductVariant } from '@/types/product.types';

export interface PriceInfo {
  minPrice: number;
  maxPrice: number;
  priceText: string;
  basePrice: number;
}

/**
 * Tính toán khoảng giá từ variants hoặc giá cơ bản
 */
export const calculatePriceRange = (
  basePrice: number,
  variants?: ProductVariant[]
): PriceInfo => {
  if (variants && variants.length > 0) {
    const prices = variants.map((variant) => variant.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    return {
      minPrice,
      maxPrice,
      priceText:
        minPrice === maxPrice
          ? `${minPrice.toLocaleString('vi-VN')}đ`
          : `Từ ${minPrice.toLocaleString('vi-VN')}đ`,
      basePrice: minPrice,
    };
  }

  return {
    minPrice: basePrice,
    maxPrice: basePrice,
    priceText: `${basePrice.toLocaleString('vi-VN')}đ`,
    basePrice: basePrice,
  };
};

/**
 * Format giá tiền theo định dạng Việt Nam
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
};

/**
 * Tính phần trăm giảm giá
 */
export const calculateDiscountPercentage = (
  originalPrice: number,
  salePrice: number
): number => {
  if (originalPrice <= salePrice) return 0;
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
};
