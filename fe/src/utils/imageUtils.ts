/**
 * Image utility functions
 * Centralized image handling and optimization
 */

/**
 * Configuration for image utilities
 */
const IMAGE_CONFIG = {
  FALLBACK_CATEGORY_IMAGE: 'https://placehold.co/800x600/e2e8f0/1e293b',
  FALLBACK_PRODUCT_IMAGE: 'https://placehold.co/400x400/f1f5f9/64748b',
  PICSUM_BASE_URL: 'https://picsum.photos/seed',
  SEEDS: {
    BOOKS: 'books',
    CLOTHING: 'clothing',
    ELECTRONICS: 'electronics',
    FOOD: 'food',
    SPORTS: 'sports',
    DEFAULT: 'default',
  },
} as const;

/**
 * Generate a hash from text for consistent image seeds
 */
const generateSeed = (text: string): number => {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = (hash << 5) - hash + text.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash) % 1000; // Limit to 0-999
};

/**
 * Get appropriate image for category based on name and slug
 */
export const getCategoryImage = (name: string, slug: string): string => {
  const seed = generateSeed(name);
  const baseName = name.toLowerCase();
  const baseSlug = slug.toLowerCase();

  // Match category type based on keywords
  if (baseSlug.includes('book') || baseSlug.includes('sach')) {
    return `${IMAGE_CONFIG.PICSUM_BASE_URL}/${IMAGE_CONFIG.SEEDS.BOOKS}-${seed}/800/600`;
  }

  if (
    baseSlug.includes('cloth') ||
    baseSlug.includes('fashion') ||
    baseSlug.includes('quanao')
  ) {
    return `${IMAGE_CONFIG.PICSUM_BASE_URL}/${IMAGE_CONFIG.SEEDS.CLOTHING}-${seed}/800/600`;
  }

  if (
    baseSlug.includes('electron') ||
    baseSlug.includes('tech') ||
    baseSlug.includes('dien')
  ) {
    return `${IMAGE_CONFIG.PICSUM_BASE_URL}/${IMAGE_CONFIG.SEEDS.ELECTRONICS}-${seed}/800/600`;
  }

  if (baseSlug.includes('food') || baseSlug.includes('thucpham')) {
    return `${IMAGE_CONFIG.PICSUM_BASE_URL}/${IMAGE_CONFIG.SEEDS.FOOD}-${seed}/800/600`;
  }

  if (baseSlug.includes('sport') || baseSlug.includes('thethao')) {
    return `${IMAGE_CONFIG.PICSUM_BASE_URL}/${IMAGE_CONFIG.SEEDS.SPORTS}-${seed}/800/600`;
  }

  // Default fallback with unique seed
  return `${IMAGE_CONFIG.PICSUM_BASE_URL}/${encodeURIComponent(baseName)}-${seed}/800/600`;
};

/**
 * Get fallback image for categories
 */
export const getCategoryFallbackImage = (categoryName: string): string => {
  return `${IMAGE_CONFIG.FALLBACK_CATEGORY_IMAGE}?text=${encodeURIComponent(categoryName)}`;
};

/**
 * Get fallback image for products
 */
export const getProductFallbackImage = (productName: string): string => {
  return `${IMAGE_CONFIG.FALLBACK_PRODUCT_IMAGE}?text=${encodeURIComponent(productName)}`;
};

/**
 * Handle image error with fallback
 */
export const handleImageError = (
  event: React.SyntheticEvent<HTMLImageElement>,
  fallbackSrc: string
): void => {
  const target = event.target as HTMLImageElement;
  target.src = fallbackSrc;
};

/**
 * Create image error handler for categories
 */
export const createCategoryImageErrorHandler = (categoryName: string) => {
  return (event: React.SyntheticEvent<HTMLImageElement>) => {
    handleImageError(event, getCategoryFallbackImage(categoryName));
  };
};

/**
 * Create image error handler for products
 */
export const createProductImageErrorHandler = (productName: string) => {
  return (event: React.SyntheticEvent<HTMLImageElement>) => {
    handleImageError(event, getProductFallbackImage(productName));
  };
};

/**
 * Optimize image URL for different sizes
 */
export const optimizeImageUrl = (
  url: string,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'webp' | 'jpg' | 'png';
  } = {}
): string => {
  if (!url) return '';

  // If it's a Picsum URL, we can add parameters
  if (url.includes('picsum.photos')) {
    const { width = 800, height = 600, quality = 80 } = options;
    return `${url}?w=${width}&h=${height}&q=${quality}`;
  }

  // If it's a placeholder URL, we can modify dimensions
  if (url.includes('placehold.co')) {
    const { width = 400, height = 400 } = options;
    return url.replace(/\d+x\d+/, `${width}x${height}`);
  }

  // Return original URL if no optimization possible
  return url;
};

/**
 * Preload images for better performance
 */
export const preloadImages = (urls: string[]): Promise<void[]> => {
  return Promise.all(
    urls.map((url) => {
      return new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = reject;
        img.src = url;
      });
    })
  );
};

/**
 * Check if image URL is valid
 */
export const isValidImageUrl = (url: string): boolean => {
  if (!url) return false;

  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
  const urlLower = url.toLowerCase();

  return (
    imageExtensions.some((ext) => urlLower.includes(ext)) ||
    urlLower.includes('picsum.photos') ||
    urlLower.includes('placehold.co')
  );
};

/**
 * Generate responsive image srcSet
 */
export const generateResponsiveImageSrcSet = (
  baseUrl: string,
  sizes: number[] = [400, 800, 1200]
): string => {
  if (!baseUrl) return '';

  return sizes
    .map((size) => `${optimizeImageUrl(baseUrl, { width: size })} ${size}w`)
    .join(', ');
};
