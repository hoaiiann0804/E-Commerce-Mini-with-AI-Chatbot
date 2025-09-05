# 🔄 Sơ Đồ Luồng Hoạt Động Dự Án

## 📊 Tổng Quan Kiến Trúc

```mermaid
graph TB
    subgraph "Frontend (React + TypeScript)"
        A[User Interface] --> B[React Components]
        B --> C[State Management - Zustand]
        C --> D[API Services]
        D --> E[HTTP Client - Axios]
    end

    subgraph "Backend (Node.js + Express)"
        F[Express Server] --> G[Authentication Middleware]
        G --> H[Route Controllers]
        H --> I[Business Logic Services]
        I --> J[Database Models]
        J --> K[SQLite Database]
    end

    subgraph "External Services"
        L[Stripe Payment]
        M[Gemini AI Chatbot]
        N[File Storage]
    end

    E --> F
    I --> L
    I --> M
    I --> N
```

## 🚀 Luồng Hoạt Động Chính

### 1. 👤 Xác Thực Người Dùng

```mermaid
sequenceDiagram
    participant U as User
    participant FE as Frontend
    participant BE as Backend
    participant DB as Database

    U->>FE: Đăng nhập/Đăng ký
    FE->>BE: POST /api/auth/login
    BE->>DB: Kiểm tra thông tin
    DB-->>BE: Trả về user data
    BE-->>FE: JWT Token + User Info
    FE-->>U: Chuyển hướng Dashboard
```

### 2. 🛍️ Quản Lý Sản Phẩm

```mermaid
sequenceDiagram
    participant A as Admin
    participant FE as Frontend
    participant BE as Backend
    participant DB as Database
    participant FS as File Storage

    A->>FE: Tạo/Sửa sản phẩm
    FE->>BE: POST /api/products (với hình ảnh)
    BE->>FS: Upload hình ảnh
    FS-->>BE: URL hình ảnh
    BE->>DB: Lưu thông tin sản phẩm
    DB-->>BE: Xác nhận
    BE-->>FE: Sản phẩm đã tạo
    FE-->>A: Hiển thị thông báo thành công
```

### 3. 🛒 Quy Trình Mua Hàng

```mermaid
sequenceDiagram
    participant C as Customer
    participant FE as Frontend
    participant BE as Backend
    participant DB as Database
    participant ST as Stripe

    C->>FE: Thêm sản phẩm vào giỏ
    FE->>FE: Cập nhật Local State
    C->>FE: Tiến hành thanh toán
    FE->>BE: POST /api/orders/create
    BE->>DB: Tạo đơn hàng tạm
    BE->>ST: Tạo Payment Intent
    ST-->>BE: Client Secret
    BE-->>FE: Payment Intent
    FE->>ST: Xử lý thanh toán
    ST-->>FE: Kết quả thanh toán
    FE->>BE: Xác nhận thanh toán
    BE->>DB: Cập nhật trạng thái đơn hàng
    DB-->>BE: Xác nhận
    BE-->>FE: Đơn hàng hoàn tất
    FE-->>C: Hiển thị thành công
```

### 4. 🤖 Chatbot Hỗ Trợ

```mermaid
sequenceDiagram
    participant U as User
    participant FE as Frontend
    participant BE as Backend
    participant AI as Gemini AI
    participant DB as Database

    U->>FE: Gửi tin nhắn chat
    FE->>BE: POST /api/chat/message
    BE->>DB: Lấy context sản phẩm
    DB-->>BE: Thông tin sản phẩm
    BE->>AI: Gửi prompt + context
    AI-->>BE: Phản hồi AI
    BE->>DB: Lưu lịch sử chat
    BE-->>FE: Tin nhắn phản hồi
    FE-->>U: Hiển thị phản hồi
```

## 🏗️ Kiến Trúc Chi Tiết

### Frontend Architecture

```
src/
├── components/          # UI Components tái sử dụng
│   ├── common/         # Button, Input, Modal...
│   ├── layout/         # Header, Footer, Sidebar
│   └── forms/          # Form components
├── pages/              # Các trang chính
│   ├── auth/           # Login, Register
│   ├── shop/           # Product listing, detail
│   ├── admin/          # Admin dashboard
│   └── checkout/       # Cart, Payment
├── store/              # Zustand state management
├── services/           # API calls
├── hooks/              # Custom React hooks
├── utils/              # Helper functions
└── types/              # TypeScript definitions
```

### Backend Architecture

```
src/
├── controllers/        # Route handlers
│   ├── auth.js        # Authentication
│   ├── products.js    # Product management
│   ├── orders.js      # Order processing
│   └── chat.js        # Chatbot
├── middlewares/        # Express middlewares
│   ├── auth.js        # JWT verification
│   ├── upload.js      # File upload
│   └── validation.js  # Input validation
├── models/            # Database models
├── services/          # Business logic
├── routes/            # API routes
└── utils/             # Helper functions
```

## 🔐 Bảo Mật & Xác Thực

```mermaid
graph LR
    A[Request] --> B{JWT Token?}
    B -->|Có| C[Verify Token]
    B -->|Không| D[Return 401]
    C --> E{Valid?}
    E -->|Có| F[Extract User Info]
    E -->|Không| D
    F --> G[Proceed to Controller]
    G --> H[Check Permissions]
    H --> I{Authorized?}
    I -->|Có| J[Execute Action]
    I -->|Không| K[Return 403]
```

## 📱 Responsive Design Flow

```mermaid
graph TD
    A[User Access] --> B{Device Type?}
    B -->|Desktop| C[Full Layout]
    B -->|Tablet| D[Adapted Layout]
    B -->|Mobile| E[Mobile Layout]

    C --> F[Sidebar Navigation]
    D --> G[Collapsible Sidebar]
    E --> H[Bottom Navigation]

    F --> I[Grid Layout]
    G --> I
    H --> J[Stack Layout]
```

## 🌐 Đa Ngôn Ngữ (i18n)

```mermaid
graph LR
    A[User Selects Language] --> B[Update i18n Context]
    B --> C[Reload Text Resources]
    C --> D[Re-render Components]
    D --> E[Update Local Storage]
    E --> F[Persist Language Choice]
```

## 📊 Quản Lý Trạng Thái

```mermaid
graph TB
    subgraph "Zustand Store"
        A[Auth Store] --> B[User Info, Token]
        C[Cart Store] --> D[Items, Total, Quantity]
        E[Product Store] --> F[Products, Categories, Filters]
        G[UI Store] --> H[Loading, Modals, Notifications]
    end

    subgraph "React Components"
        I[Login Component] --> A
        J[Cart Component] --> C
        K[Product List] --> E
        L[Loading Spinner] --> G
    end
```

## 🚀 Deployment Flow

```mermaid
graph LR
    A[Source Code] --> B[Build Process]
    B --> C{Environment}
    C -->|Development| D[Local Server]
    C -->|Production| E[Production Server]

    D --> F[npm run dev]
    E --> G[npm run build]
    G --> H[Static Files]
    H --> I[Web Server]
```

## 📈 Performance Optimization

```mermaid
graph TD
    A[Performance Strategy] --> B[Frontend Optimization]
    A --> C[Backend Optimization]

    B --> D[Code Splitting]
    B --> E[Lazy Loading]
    B --> F[Image Optimization]
    B --> G[Caching]

    C --> H[Database Indexing]
    C --> I[API Response Caching]
    C --> J[File Compression]
    C --> K[Connection Pooling]
```

## 🔄 Data Flow Summary

1. **User Interaction** → Frontend captures user actions
2. **State Management** → Zustand manages application state
3. **API Calls** → Frontend communicates with backend via REST API
4. **Authentication** → JWT tokens secure all requests
5. **Business Logic** → Backend processes requests and applies business rules
6. **Database Operations** → SQLite stores and retrieves data
7. **External Services** → Integration with Stripe and Gemini AI
8. **Response** → Data flows back to frontend and updates UI

Sơ đồ này cho thấy dự án được thiết kế với kiến trúc hiện đại, bảo mật cao và dễ mở rộng.
