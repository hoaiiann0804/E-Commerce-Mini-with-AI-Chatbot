# 📁 Cấu Trúc Dự Án Website Bán Hàng Mini

## 🔍 Tổng Quan

Website Bán Hàng Mini được xây dựng theo kiến trúc client-server với hai phần chính:

- **Frontend**: React + TypeScript + Vite
- **Backend**: Node.js + Express + PostgreSQL

## 📂 Cấu Trúc Frontend

```
frontend/
├── public/                 # Static assets
│   ├── images/             # Hình ảnh tĩnh
│   ├── admin/              # Admin panel assets
│   └── favicon.ico         # Favicon
├── src/                    # Source code
│   ├── assets/             # Dynamic assets
│   ├── components/         # React components
│   │   ├── common/         # Common UI components
│   │   ├── layout/         # Layout components
│   │   └── forms/          # Form components
│   ├── config/             # Configuration files
│   ├── constants/          # Constants and enums
│   ├── contexts/           # React contexts
│   ├── data/               # Static data
│   ├── features/           # Feature modules
│   │   ├── auth/           # Authentication
│   │   ├── cart/           # Shopping cart
│   │   ├── products/       # Product management
│   │   ├── checkout/       # Checkout process
│   │   └── ai-chatbot/     # Gemini AI chatbot
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Third-party libraries
│   ├── locales/            # i18n translations
│   ├── pages/              # Page components
│   ├── routes/             # Routing configuration
│   ├── services/           # API services
│   ├── store/              # State management
│   ├── styles/             # Global styles
│   ├── types/              # TypeScript types
│   ├── utils/              # Utility functions
│   ├── App.tsx             # Main App component
│   └── main.tsx            # Entry point
├── .env.example            # Environment variables example
├── package.json            # Dependencies and scripts
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite configuration
```

### 🔑 Thành Phần Chính Frontend

1. **Components**: Các thành phần UI tái sử dụng

   - `common`: Button, Input, Modal, Card...
   - `layout`: Header, Footer, Sidebar...
   - `forms`: Form components với validation

2. **Pages**: Các trang chính của ứng dụng

   - Home, Shop, Product Detail, Cart, Checkout...
   - Admin Dashboard, Product Management...

3. **Store**: Quản lý state với Zustand

   - `authStore`: Quản lý authentication
   - `cartStore`: Quản lý giỏ hàng
   - `productStore`: Quản lý sản phẩm
   - `uiStore`: Quản lý UI state

4. **Services**: Giao tiếp với backend API

   - `api.ts`: Axios instance và interceptors
   - `authService.ts`: Authentication API
   - `productService.ts`: Product API
   - `orderService.ts`: Order API

5. **Features**: Module hóa các tính năng
   - Mỗi feature có components, hooks, services riêng
   - Tách biệt logic business và UI

## 📂 Cấu Trúc Backend

```
backend/
├── scripts/                # Database scripts
│   ├── seed-database.js    # Seed data script
│   └── import-hybrid-products.js # Import products
├── src/                    # Source code
│   ├── config/             # Configuration
│   ├── constants/          # Constants
│   ├── controllers/        # Route controllers
│   │   ├── auth.js         # Authentication
│   │   ├── products.js     # Products
│   │   ├── orders.js       # Orders
│   │   └── admin.js        # Admin
│   ├── database/           # Database setup
│   ├── middlewares/        # Express middlewares
│   │   ├── auth.js         # Authentication
│   │   ├── validation.js   # Input validation
│   │   └── upload.js       # File upload
│   ├── migrations/         # Database migrations
│   ├── models/             # Database models
│   │   ├── user.js         # User model
│   │   ├── product.js      # Product model
│   │   ├── order.js        # Order model
│   │   └── category.js     # Category model
│   ├── routes/             # API routes
│   │   ├── auth.js         # Auth routes
│   │   ├── products.js     # Product routes
│   │   ├── orders.js       # Order routes
│   │   └── admin.js        # Admin routes
│   ├── services/           # Business logic
│   │   ├── auth.js         # Auth service
│   │   ├── product.js      # Product service
│   │   ├── order.js        # Order service
│   │   └── ai.js           # AI service
│   ├── utils/              # Utility functions
│   ├── validators/         # Input validators
│   ├── app.js              # Express app
│   └── server.js           # Server entry point
├── uploads/                # Uploaded files
│   ├── products/           # Product images
│   └── users/              # User avatars
├── .env.example            # Environment variables example
└── package.json            # Dependencies and scripts
```

### 🔑 Thành Phần Chính Backend

1. **Controllers**: Xử lý requests và responses

   - Nhận request từ client
   - Gọi services để xử lý business logic
   - Trả về response cho client

2. **Services**: Xử lý business logic

   - Tách biệt logic khỏi controllers
   - Tương tác với models để CRUD data
   - Xử lý các nghiệp vụ phức tạp

3. **Models**: Định nghĩa cấu trúc dữ liệu

   - Sử dụng Sequelize ORM
   - Định nghĩa relationships giữa các models
   - Validation data

4. **Routes**: Định nghĩa API endpoints

   - RESTful API design
   - Grouping routes theo tính năng
   - Middleware authentication và validation

5. **Middlewares**: Xử lý trước/sau requests
   - Authentication với JWT
   - Validation input
   - Error handling
   - File upload

## 🗄️ Cấu Trúc Database

### 📊 Entity Relationship Diagram (ERD)

```
┌─────────────┐       ┌─────────────┐       ┌─────────────┐
│   Users     │       │  Products   │       │ Categories  │
├─────────────┤       ├─────────────┤       ├─────────────┤
│ id          │       │ id          │       │ id          │
│ email       │       │ name        │       │ name        │
│ password    │       │ description │       │ description │
│ name        │       │ price       │       │ image       │
│ role        │       │ stock       │       │ slug        │
│ avatar      │       │ categoryId  │─────┐ │ createdAt   │
│ createdAt   │       │ images      │     └─│ updatedAt   │
│ updatedAt   │       │ variants    │       └─────────────┘
└─────────────┘       │ attributes  │
        │             │ createdAt   │       ┌─────────────┐
        │             │ updatedAt   │       │  Reviews    │
        │             └─────────────┘       ├─────────────┤
        │                     │             │ id          │
        │                     └────────────┐│ rating      │
        │                                  ││ comment     │
┌─────────────┐       ┌─────────────┐     ││ userId      │─┐
│   Orders    │       │ OrderItems  │     ││ productId   │┐│
├─────────────┤       ├─────────────┤     ││ createdAt   │││
│ id          │       │ id          │     ││ updatedAt   │││
│ userId      │───────│ orderId     │     │└─────────────┘││
│ status      │       │ productId   │─────┘               ││
│ total       │       │ quantity    │                     ││
│ address     │       │ price       │                     ││
│ paymentId   │       │ variantId   │                     ││
│ createdAt   │       │ createdAt   │                     ││
│ updatedAt   │       │ updatedAt   │                     ││
└─────────────┘       └─────────────┘                     ││
        │                                                 ││
        └─────────────────────────────────────────────────┘│
                                                           │
                                                           │
┌─────────────┐       ┌─────────────┐                      │
│  Variants   │       │ Attributes  │                      │
├─────────────┤       ├─────────────┤                      │
│ id          │       │ id          │                      │
│ productId   │       │ name        │                      │
│ name        │       │ value       │                      │
│ price       │       │ productId   │                      │
│ stock       │       │ createdAt   │                      │
│ attributes  │       │ updatedAt   │                      │
│ createdAt   │       └─────────────┘                      │
│ updatedAt   │                                            │
└─────────────┘                                            │
                                                           │
┌─────────────┐                                            │
│  Wishlist   │                                            │
├─────────────┤                                            │
│ id          │                                            │
│ userId      │────────────────────────────────────────────┘
│ productId   │
│ createdAt   │
│ updatedAt   │
└─────────────┘
```

### 📝 Các Bảng Chính

1. **Users**: Người dùng và admin

   - Roles: customer, admin
   - Authentication với JWT

2. **Products**: Sản phẩm

   - Variants: các biến thể sản phẩm (size, color, etc.)
   - Attributes: thuộc tính động của sản phẩm
   - Images: gallery hình ảnh

3. **Categories**: Danh mục sản phẩm

   - Hierarchical structure (parent-child)

4. **Orders**: Đơn hàng

   - OrderItems: Chi tiết đơn hàng
   - Payment information

5. **Reviews**: Đánh giá sản phẩm
   - Rating và comments

## 🔄 Luồng Hoạt Động Chính

### 1. Đăng Ký/Đăng Nhập

- User đăng ký tài khoản
- Backend validate và lưu thông tin
- JWT token được tạo và trả về
- Frontend lưu token trong localStorage
- Subsequent requests sử dụng token

### 2. Xem Sản Phẩm

- Frontend gọi API lấy danh sách sản phẩm
- Backend truy vấn database và trả về
- Frontend render sản phẩm với filters và pagination
- User có thể search, filter, sort

### 3. Thêm Vào Giỏ Hàng

- User chọn sản phẩm và variants
- Frontend lưu thông tin vào cart store
- Cart được lưu trong localStorage
- User có thể update quantity hoặc remove items

### 4. Checkout

- User điền thông tin shipping
- Frontend gửi order data lên backend
- Backend tạo order và payment intent
- Frontend hiển thị form thanh toán
- User hoàn tất thanh toán
- Backend update order status
- Email xác nhận được gửi

### 5. Admin Management

- Admin đăng nhập với admin credentials
- Admin có thể CRUD products, categories
- Admin xem và update order status
- Admin xem analytics và reports

## 🤖 Tích Hợp AI

### Gemini AI Chatbot

- User gửi câu hỏi từ chat widget
- Frontend gửi message lên backend
- Backend gửi prompt + context đến Gemini API
- Gemini trả về response
- Backend format và trả về cho frontend
- Frontend hiển thị response trong chat

## 🔒 Bảo Mật

1. **Authentication**: JWT-based
2. **Password**: Bcrypt hashing
3. **Input Validation**: Server-side validation
4. **CORS**: Configured properly
5. **Rate Limiting**: Prevent brute force
6. **XSS Protection**: Content sanitization

## 🚀 Performance

1. **Code Splitting**: Lazy loading components
2. **Image Optimization**: Responsive images
3. **Caching**: API responses
4. **Database Indexing**: Optimized queries
5. **Compression**: gzip/brotli
