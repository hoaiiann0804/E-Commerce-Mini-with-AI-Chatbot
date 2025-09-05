import { ProductFormData } from '@/types';

export const sampleLaptopData: Partial<ProductFormData> = {
  // Basic Info
  name: 'MacBook Pro 16-inch M3 Max',
  slug: 'macbook-pro-16-inch-m3-max',
  shortDescription:
    'Laptop cao cấp với chip M3 Max mạnh mẽ, màn hình Liquid Retina XDR 16 inch, pin 22 giờ. Hoàn hảo cho chuyên gia sáng tạo và lập trình viên.',
  description: `
    <h2>🚀 MacBook Pro 16-inch M3 Max - Sức mạnh vượt trội cho chuyên gia</h2>
    <p>MacBook Pro 16-inch với chip M3 Max là đỉnh cao của công nghệ Apple, được thiết kế dành cho những chuyên gia đòi hỏi hiệu năng tối đa.</p>
    
    <h3>⚡ Hiệu năng đột phá với chip M3 Max</h3>
    <p>Chip M3 Max với 16 nhân CPU và 40 nhân GPU mang lại hiệu năng vượt trội:</p>
    <ul>
      <li>Xử lý video 8K ProRes mượt mà</li>
      <li>Render 3D nhanh gấp 2.5 lần thế hệ trước</li>
      <li>Multitasking mượt mà với hàng trăm tab Chrome</li>
      <li>Compile code nhanh chóng với Xcode</li>
    </ul>
    
    <h3>🖥️ Màn hình Liquid Retina XDR tuyệt đẹp</h3>
    <p>Màn hình 16.2 inch với công nghệ mini-LED:</p>
    <ul>
      <li>Độ phân giải 3456 x 2234 pixels</li>
      <li>Độ sáng 1000 nits (1600 nits peak HDR)</li>
      <li>Tỷ lệ tương phản 1,000,000:1</li>
      <li>Hỗ trợ P3 wide color gamut</li>
      <li>ProMotion với tần số quét lên đến 120Hz</li>
    </ul>
    
    <h3>🔋 Pin bền bỉ cả ngày dài</h3>
    <p>Pin lithium-polymer 100Wh cung cấp:</p>
    <ul>
      <li>Lên đến 22 giờ phát video</li>
      <li>18 giờ duyệt web không dây</li>
      <li>Sạc nhanh với adapter 140W USB-C</li>
    </ul>
    
    <h3>🎵 Âm thanh đỉnh cao</h3>
    <p>Hệ thống âm thanh 6 loa với:</p>
    <ul>
      <li>Woofers force-cancelling</li>
      <li>Âm thanh không gian với Dolby Atmos</li>
      <li>3 micro array với beamforming</li>
    </ul>
    
    <h3>🔌 Kết nối đa dạng</h3>
    <ul>
      <li>3 cổng Thunderbolt 4 (USB-C)</li>
      <li>1 cổng HDMI</li>
      <li>1 khe thẻ SDXC</li>
      <li>1 cổng MagSafe 3</li>
      <li>Jack tai nghe 3.5mm</li>
    </ul>
    
    <h3>🛡️ Bảo mật tối ưu</h3>
    <ul>
      <li>Touch ID tích hợp</li>
      <li>Secure Enclave</li>
      <li>Camera FaceTime HD 1080p</li>
    </ul>
    
    <p><strong>Lý do chọn MacBook Pro 16-inch M3 Max:</strong></p>
    <ul>
      <li>✅ Hiệu năng đỉnh cao cho mọi tác vụ</li>
      <li>✅ Màn hình chuyên nghiệp</li>
      <li>✅ Pin bền bỉ</li>
      <li>✅ Thiết kế premium</li>
      <li>✅ Hệ sinh thái Apple hoàn hảo</li>
    </ul>
  `,

  // Pricing
  basePrice: 89990000,
  salePrice: 84990000,
  costPrice: 75000000,
  onSale: true,

  // Inventory
  trackInventory: true,
  stockQuantity: 50,
  lowStockThreshold: 5,
  allowBackorder: false,
  weight: 2.16,
  length: 35.57,
  width: 24.81,
  height: 1.68,
  sku: 'MBP16-M3MAX-1TB-SG',

  // Status
  status: 'active',
  featured: true,
  tags: ['laptop', 'macbook', 'apple', 'm3-max', 'professional', 'creative'],

  // SEO
  metaTitle:
    'MacBook Pro 16-inch M3 Max - Laptop cao cấp cho chuyên gia | TechStore',
  metaDescription:
    'MacBook Pro 16-inch M3 Max với chip M3 Max mạnh mẽ, màn hình Liquid Retina XDR, pin 22 giờ. Giá tốt nhất, bảo hành chính hãng. Mua ngay!',
  metaKeywords:
    'macbook pro 16, m3 max, laptop apple, macbook pro 2024, laptop cao cấp',

  // Shipping
  freeShipping: true,
  shippingClass: 'standard',

  // Warranty
  warrantyPeriod: 12,
  warrantyType: 'manufacturer',
  warrantyDescription: 'Bảo hành chính hãng Apple 12 tháng toàn cầu',
};

export const sampleLaptopAttributes = [
  {
    groupName: 'Thông số kỹ thuật',
    attributes: [
      { name: 'Chip xử lý', value: 'Apple M3 Max (16-core CPU, 40-core GPU)' },
      { name: 'RAM', value: '36GB Unified Memory' },
      { name: 'Ổ cứng', value: '1TB SSD' },
      { name: 'Màn hình', value: '16.2-inch Liquid Retina XDR (3456 x 2234)' },
      { name: 'Card đồ họa', value: '40-core GPU tích hợp' },
      { name: 'Hệ điều hành', value: 'macOS Sonoma' },
      { name: 'Pin', value: '100Wh lithium-polymer' },
      { name: 'Trọng lượng', value: '2.16 kg' },
    ],
  },
  {
    groupName: 'Kết nối',
    attributes: [
      {
        name: 'Cổng kết nối',
        value: '3x Thunderbolt 4, 1x HDMI, 1x SDXC, MagSafe 3',
      },
      { name: 'Wireless', value: 'Wi-Fi 6E, Bluetooth 5.3' },
      { name: 'Camera', value: '1080p FaceTime HD camera' },
      { name: 'Audio', value: '6-speaker system, 3-mic array' },
    ],
  },
  {
    groupName: 'Thiết kế',
    attributes: [
      { name: 'Chất liệu', value: '100% recycled aluminum' },
      { name: 'Màu sắc', value: 'Space Gray, Silver' },
      { name: 'Bàn phím', value: 'Magic Keyboard with Touch ID' },
      { name: 'Trackpad', value: 'Force Touch trackpad' },
    ],
  },
];

export const sampleLaptopVariants = [
  {
    name: 'MacBook Pro 16" M3 Max - 36GB RAM - 1TB SSD - Space Gray',
    sku: 'MBP16-M3MAX-36GB-1TB-SG',
    price: 89990000,
    salePrice: 84990000,
    stockQuantity: 25,
    attributes: [
      { name: 'RAM', value: '36GB' },
      { name: 'Storage', value: '1TB SSD' },
      { name: 'Color', value: 'Space Gray' },
    ],
  },
  {
    name: 'MacBook Pro 16" M3 Max - 36GB RAM - 1TB SSD - Silver',
    sku: 'MBP16-M3MAX-36GB-1TB-SL',
    price: 89990000,
    salePrice: 84990000,
    stockQuantity: 25,
    attributes: [
      { name: 'RAM', value: '36GB' },
      { name: 'Storage', value: '1TB SSD' },
      { name: 'Color', value: 'Silver' },
    ],
  },
  {
    name: 'MacBook Pro 16" M3 Max - 48GB RAM - 2TB SSD - Space Gray',
    sku: 'MBP16-M3MAX-48GB-2TB-SG',
    price: 109990000,
    salePrice: 104990000,
    stockQuantity: 15,
    attributes: [
      { name: 'RAM', value: '48GB' },
      { name: 'Storage', value: '2TB SSD' },
      { name: 'Color', value: 'Space Gray' },
    ],
  },
  {
    name: 'MacBook Pro 16" M3 Max - 48GB RAM - 2TB SSD - Silver',
    sku: 'MBP16-M3MAX-48GB-2TB-SL',
    price: 109990000,
    salePrice: 104990000,
    stockQuantity: 15,
    attributes: [
      { name: 'RAM', value: '48GB' },
      { name: 'Storage', value: '2TB SSD' },
      { name: 'Color', value: 'Silver' },
    ],
  },
];
