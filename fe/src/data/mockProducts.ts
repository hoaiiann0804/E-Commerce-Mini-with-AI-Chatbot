import { Product } from '@/types/product.types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    slug: 'premium-wireless-headphones',
    price: 129.99,
    compareAtPrice: 159.99,
    thumbnail:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    ],
    description: `
      <h2>Premium Wireless Headphones</h2>
      <p>Experience premium sound quality with these wireless headphones. Features noise cancellation, long battery life, and comfortable ear cups for extended listening sessions.</p>
      
      <img src="http://localhost:8888/api/uploads/images/product/2025/07/50eb3725-c874-44af-8a50-759d4ee2c0b1.png" alt="Product Image" style="max-width: 100%; height: auto;" />
      
      <p><strong>Note:</strong> This image URL uses /api/uploads which should be automatically fixed to /uploads by ProductDetailsSection.</p>
      
      <h3>Key Features:</h3>
      <ul>
        <li><strong>Noise Cancellation:</strong> Advanced ANC technology</li>
        <li><strong>Battery Life:</strong> Up to 30 hours of playback</li>
        <li><strong>Comfort:</strong> Premium ear cushions</li>
        <li><strong>Connectivity:</strong> Bluetooth 5.0</li>
      </ul>
      
      <p>Perfect for music lovers, professionals, and anyone who values high-quality audio experience.</p>
    `,
    shortDescription: 'Premium wireless headphones with noise cancellation',
    categoryId: '1',
    categoryName: 'Audio',
    stock: 15,
    ratings: {
      average: 4.7,
      count: 124,
    },
    attributes: {
      color: 'Black',
      connectivity: 'Bluetooth 5.0',
      batteryLife: '30 hours',
    },
    isNew: true,
    isFeatured: true,
    createdAt: '2023-01-15T08:00:00Z',
    updatedAt: '2023-05-20T10:30:00Z',
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    slug: 'smart-fitness-watch',
    price: 149.99,
    compareAtPrice: 199.99,
    thumbnail:
      'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    ],
    description:
      'Track your fitness goals with this advanced smart watch. Features heart rate monitoring, sleep tracking, GPS, and water resistance up to 50 meters. Compatible with iOS and Android devices.',
    shortDescription: 'Advanced fitness tracking with heart rate monitoring',
    categoryId: '2',
    categoryName: 'Wearables',
    stock: 8,
    ratings: {
      average: 4.5,
      count: 89,
    },
    attributes: {
      color: 'Black/Silver',
      display: 'AMOLED',
      waterResistance: '50m',
    },
    isNew: true,
    isFeatured: true,
    createdAt: '2023-02-10T09:15:00Z',
    updatedAt: '2023-06-05T14:20:00Z',
  },
  {
    id: '3',
    name: 'Portable Bluetooth Speaker',
    slug: 'portable-bluetooth-speaker',
    price: 99.99,
    compareAtPrice: 129.99,
    thumbnail:
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1589003077984-894e133dabab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1563330232-57114bb0823c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    ],
    description:
      'Take your music anywhere with this portable Bluetooth speaker. Features 360° sound, waterproof design, and up to 12 hours of battery life. Perfect for outdoor adventures or home use.',
    shortDescription: 'Waterproof portable speaker with 360° sound',
    categoryId: '1',
    categoryName: 'Audio',
    stock: 20,
    ratings: {
      average: 4.3,
      count: 67,
    },
    attributes: {
      color: 'Blue',
      batteryLife: '12 hours',
      waterproof: 'IPX7',
    },
    isNew: false,
    isFeatured: true,
    createdAt: '2023-03-05T11:30:00Z',
    updatedAt: '2023-05-15T16:45:00Z',
  },
  {
    id: '4',
    name: 'Ultra-Slim Laptop',
    slug: 'ultra-slim-laptop',
    price: 899.99,
    compareAtPrice: 1099.99,
    thumbnail:
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1602080858428-57174f9431cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    ],
    description:
      'Powerful and portable, this ultra-slim laptop features a 14" 4K display, the latest processor, 16GB RAM, and 512GB SSD storage. Perfect for professionals and creatives on the go.',
    shortDescription: 'Powerful ultra-slim laptop with 4K display',
    categoryId: '3',
    categoryName: 'Computers',
    stock: 5,
    ratings: {
      average: 4.8,
      count: 42,
    },
    attributes: {
      processor: 'Intel Core i7',
      memory: '16GB',
      storage: '512GB SSD',
      display: '14" 4K',
    },
    isNew: true,
    isFeatured: false,
    createdAt: '2023-04-20T10:00:00Z',
    updatedAt: '2023-06-10T09:30:00Z',
  },
  {
    id: '5',
    name: 'Wireless Charging Pad',
    slug: 'wireless-charging-pad',
    price: 49.99,
    compareAtPrice: 69.99,
    thumbnail:
      'https://images.unsplash.com/photo-1622445275576-721325763afe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1622445275576-721325763afe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1618577914088-73a2e7a9e302?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1628815113969-0487917fc601?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    ],
    description:
      'Charge your devices wirelessly with this sleek charging pad. Compatible with all Qi-enabled devices, featuring fast charging technology and a non-slip surface.',
    shortDescription: 'Fast wireless charging for Qi-enabled devices',
    categoryId: '4',
    categoryName: 'Accessories',
    stock: 30,
    ratings: {
      average: 4.2,
      count: 56,
    },
    attributes: {
      color: 'White',
      compatibility: 'Qi-enabled devices',
      chargingSpeed: '15W',
    },
    isNew: false,
    isFeatured: false,
    createdAt: '2023-01-25T14:20:00Z',
    updatedAt: '2023-04-30T11:15:00Z',
  },
  {
    id: '6',
    name: '4K Smart TV',
    slug: '4k-smart-tv',
    price: 599.99,
    compareAtPrice: 799.99,
    thumbnail:
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1601944177325-f8867652837f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1461151304267-38535e780c79?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    ],
    description:
      'Transform your home entertainment with this 55" 4K Smart TV. Features HDR, built-in streaming apps, voice control, and a sleek, borderless design for an immersive viewing experience.',
    shortDescription: '55" 4K Smart TV with HDR and voice control',
    categoryId: '5',
    categoryName: 'TVs & Home Theater',
    stock: 7,
    ratings: {
      average: 4.6,
      count: 78,
    },
    attributes: {
      size: '55 inches',
      resolution: '4K Ultra HD',
      smartFeatures: 'Built-in streaming, Voice control',
    },
    isNew: false,
    isFeatured: true,
    createdAt: '2023-02-05T16:30:00Z',
    updatedAt: '2023-05-25T13:45:00Z',
  },
  {
    id: '7',
    name: 'Digital Camera',
    slug: 'digital-camera',
    price: 449.99,
    compareAtPrice: 549.99,
    thumbnail:
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1581591524425-c7e0978865fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    ],
    description:
      "Capture life's moments with this high-quality digital camera. Features a 24MP sensor, 4K video recording, 10x optical zoom, and built-in Wi-Fi for easy sharing.",
    shortDescription: '24MP digital camera with 4K video recording',
    categoryId: '6',
    categoryName: 'Cameras',
    stock: 12,
    ratings: {
      average: 4.4,
      count: 45,
    },
    attributes: {
      sensorType: 'CMOS',
      resolution: '24MP',
      videoRecording: '4K',
      opticalZoom: '10x',
    },
    isNew: false,
    isFeatured: false,
    createdAt: '2023-03-15T09:45:00Z',
    updatedAt: '2023-06-02T15:20:00Z',
  },
  {
    id: '8',
    name: 'Gaming Console',
    slug: 'gaming-console',
    price: 499.99,
    compareAtPrice: null,
    thumbnail:
      'https://images.unsplash.com/photo-1605901309584-818e25960a8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1605901309584-818e25960a8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1591840870617-a1b7a5c0e0e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    ],
    description:
      'Experience next-generation gaming with this powerful console. Features 4K gaming, 1TB storage, backward compatibility, and access to an extensive game library.',
    shortDescription: 'Next-gen gaming console with 4K capabilities',
    categoryId: '7',
    categoryName: 'Gaming',
    stock: 3,
    ratings: {
      average: 4.9,
      count: 112,
    },
    attributes: {
      storage: '1TB SSD',
      resolution: '4K',
      controller: 'Wireless',
    },
    isNew: true,
    isFeatured: true,
    createdAt: '2023-04-10T13:15:00Z',
    updatedAt: '2023-06-15T10:30:00Z',
  },
];

export const getProductBySlug = (slug: string): Product | undefined => {
  // First try to find by slug
  const productBySlug = mockProducts.find((product) => product.slug === slug);
  if (productBySlug) return productBySlug;

  // If not found, try to find by ID (for compatibility with cart links)
  return mockProducts.find((product) => product.id === slug);
};

export const getProductById = (id: string): Product | undefined => {
  return mockProducts.find((product) => product.id === id);
};

export const getRelatedProducts = (productId: string): Product[] => {
  const product = getProductById(productId);
  if (!product) return [];

  return mockProducts
    .filter((p) => p.id !== productId && p.categoryId === product.categoryId)
    .slice(0, 4);
};

export const getFeaturedProducts = (): Product[] => {
  return mockProducts.filter((product) => product.isFeatured).slice(0, 4);
};

export const getNewArrivals = (): Product[] => {
  return mockProducts.filter((product) => product.isNew).slice(0, 4);
};
