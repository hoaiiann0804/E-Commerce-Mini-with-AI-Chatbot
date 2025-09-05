/**
 * Format price to Vietnamese currency
 * @param price - The price to format (can be string or number)
 * @returns Formatted price string
 */
export const formatPrice = (price: string | number): string => {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;

  // Handle invalid prices
  if (isNaN(numPrice)) {
    return '0đ';
  }

  return `${numPrice.toLocaleString('vi-VN')}đ`;
};

/**
 * Format price to USD currency
 * @param price - The price to format (can be string or number)
 * @returns Formatted price string
 */
export const formatPriceUSD = (price: string | number): string => {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;

  // Handle invalid prices
  if (isNaN(numPrice)) {
    return '$0.00';
  }

  return `$${numPrice.toFixed(2)}`;
};

/**
 * Format number to Vietnamese locale
 * @param num - The number to format
 * @returns Formatted number string
 */
export const formatNumber = (num: number): string => {
  return num.toLocaleString('vi-VN');
};

/**
 * Parse price from string to number
 * @param price - The price string to parse
 * @returns Parsed number or 0 if invalid
 */
export const parsePrice = (price: string | number): number => {
  if (typeof price === 'number') {
    return price;
  }

  const parsed = parseFloat(price);
  return isNaN(parsed) ? 0 : parsed;
};
