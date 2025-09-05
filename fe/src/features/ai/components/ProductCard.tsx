import React from 'react';
import { Link } from 'react-router-dom';
import { ProductRecommendation } from '../services/chatbotApi';
import { EyeIcon, ImageIcon, StarIcon } from './icons';

interface ProductCardProps {
  product: ProductRecommendation;
}

/**
 * Component hiển thị thông tin sản phẩm trong chat
 */
const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // Format giá tiền với dấu chấm ngăn cách hàng nghìn
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Link
      to={`/products/${product.id}`}
      className="group relative flex flex-col overflow-hidden rounded-xl bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-800 dark:to-neutral-900 hover:shadow-lg transition-all duration-300 border border-neutral-200/70 dark:border-neutral-700/70 hover:border-primary-200 dark:hover:border-primary-700/50"
      onClick={(e) => {
        // Ngăn chặn sự kiện click lan tỏa lên các phần tử cha
        e.stopPropagation();

        // Sử dụng navigate trực tiếp thay vì mở tab mới
        // Không cần e.preventDefault() để cho phép Link hoạt động bình thường
      }}
    >
      {/* Discount badge */}
      {product.discount > 0 && (
        <div className="absolute top-2 left-2 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
          -{product.discount}%
        </div>
      )}

      {/* Product image with hover effect */}
      <div className="relative overflow-hidden h-36 w-full">
        {product.thumbnail ? (
          <img
            src={product.thumbnail}
            alt={product.name}
            className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-neutral-100 dark:bg-neutral-800">
            <ImageIcon />
          </div>
        )}

        {/* Overlay with quick actions */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex space-x-2">
            <span className="bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm text-primary-600 dark:text-primary-400 p-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-neutral-700 transition-all">
              <EyeIcon />
            </span>
          </div>
        </div>
      </div>

      {/* Product info */}
      <div className="p-3 flex flex-col flex-grow">
        <h4 className="font-medium text-sm text-neutral-800 dark:text-white line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {product.name}
        </h4>

        {/* Rating */}
        {product.rating > 0 && (
          <div className="flex items-center mt-1.5 mb-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-neutral-300 dark:text-neutral-600'}`}
                  filled={i < Math.floor(product.rating)}
                />
              ))}
            </div>
            <span className="text-xs text-neutral-500 dark:text-neutral-400 ml-1">
              ({product.rating.toFixed(1)})
            </span>
          </div>
        )}

        {/* Stock status */}
        <div className="mt-auto pt-2 flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center">
              <span className="text-sm font-bold text-neutral-900 dark:text-white">
                {formatPrice(product.price)}
              </span>
              {product.compareAtPrice &&
                product.compareAtPrice > product.price && (
                  <span className="ml-2 text-xs line-through text-neutral-500 dark:text-neutral-400">
                    {formatPrice(product.compareAtPrice)}
                  </span>
                )}
            </div>
          </div>

          <span
            className={`text-xs px-2 py-0.5 rounded-full ${
              product.inStock
                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
            }`}
          >
            {product.inStock ? 'Còn hàng' : 'Hết hàng'}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
