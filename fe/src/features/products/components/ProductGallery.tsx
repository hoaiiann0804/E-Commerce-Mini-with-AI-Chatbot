import { useState } from 'react';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({
  images,
  productName,
}) => {
  const [activeImage, setActiveImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  // Handle thumbnail click
  const handleThumbnailClick = (index: number) => {
    setActiveImage(index);
    setIsZoomed(false);
  };

  // Handle zoom toggle
  const handleZoomToggle = () => {
    setIsZoomed(!isZoomed);
  };

  // Handle mouse move for zoom effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;

    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomPosition({ x, y });
  };

  // Handle mouse leave
  const handleMouseLeave = () => {
    if (isZoomed) {
      setIsZoomed(false);
    }
  };

  // If no images provided, show placeholder
  if (!images || images.length === 0) {
    return (
      <div className="aspect-square bg-neutral-100 dark:bg-neutral-800 rounded-lg flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-neutral-400 dark:text-neutral-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main image */}
      <div
        className={`relative aspect-square overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-700 ${
          isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
        }`}
        onClick={handleZoomToggle}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className={`w-full h-full transition-transform duration-200 ${
            isZoomed ? 'scale-150' : 'scale-100'
          }`}
          style={
            isZoomed
              ? {
                  transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                }
              : undefined
          }
        >
          <img
            src={images[activeImage]}
            alt={`${productName} - Hình ${activeImage + 1}`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Zoom indicator */}
        {!isZoomed && (
          <div className="absolute top-2 right-2 bg-white dark:bg-neutral-800 rounded-full p-1 shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-neutral-600 dark:text-neutral-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 ${
                activeImage === index
                  ? 'border-primary-500'
                  : 'border-transparent hover:border-neutral-300 dark:hover:border-neutral-600'
              }`}
            >
              <img
                src={image}
                alt={`${productName} - Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
