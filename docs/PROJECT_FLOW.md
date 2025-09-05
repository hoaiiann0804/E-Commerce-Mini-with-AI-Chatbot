# 🔄 Luồng Hoạt Động Dự Án Website Bán Hàng Mini

## 📊 Tổng Quan Kiến Trúc

Website Bán Hàng Mini được xây dựng theo mô hình client-server với kiến trúc hiện đại:

- **Frontend**: React + TypeScript + Zustand
- **Backend**: Node.js + Express + PostgreSQL
- **External Services**: Stripe Payment, Gemini AI

## 🚀 Luồng Hoạt Động Chính

### 1. 👤 Xác Thực Người Dùng

**Đăng ký tài khoản:**

1. User nhập thông tin đăng ký (email, password, name)
2. Frontend validate form và gửi request đến `/api/auth/register`
3. Backend kiểm tra email đã tồn tại chưa
4. Backend mã hóa password với bcrypt
5. Backend lưu thông tin user vào database
6. Backend tạo JWT token và trả về
7. Frontend lưu token vào localStorage
8. User được chuyển đến trang chính

**Đăng nhập:**

1. User nhập email và password
2. Frontend gửi request đến `/api/auth/login`
3. Backend kiểm tra thông tin đăng nhập
4. Backend tạo JWT token và trả về
5. Frontend lưu token vào localStorage
6. User được chuyển đến trang chính

### 2. 🛍️ Xem và Tìm Kiếm Sản Phẩm

**Xem danh sách sản phẩm:**

1. Frontend gửi request đến `/api/products` với các tham số filter
2. Backend truy vấn database với các điều kiện filter
3. Backend trả về danh sách sản phẩm và metadata (total, pagination)
4. Frontend render sản phẩm với lazy loading images

**Tìm kiếm sản phẩm:**

1. User nhập từ khóa tìm kiếm
2. Frontend gửi request đến `/api/products/search`
3. Backend thực hiện full-text search
4. Backend trả về kết quả tìm kiếm
5. Frontend hiển thị kết quả

**Xem chi tiết sản phẩm:**

1. User click vào sản phẩm
2. Frontend gửi request đến `/api/products/:id`
3. Backend truy vấn sản phẩm và các thông tin liên quan (variants, reviews)
4. Backend trả về thông tin chi tiết sản phẩm
5. Frontend render trang chi tiết sản phẩm

### 3. 🛒 Giỏ Hàng và Checkout

**Thêm sản phẩm vào giỏ hàng:**

1. User chọn sản phẩm, variant và số lượng
2. Frontend thêm sản phẩm vào cart store (Zustand)
3. Frontend lưu giỏ hàng vào localStorage
4. UI cập nhật hiển thị số lượng sản phẩm trong giỏ

**Quản lý giỏ hàng:**

1. User xem giỏ hàng
2. Frontend hiển thị sản phẩm từ cart store
3. User có thể thay đổi số lượng hoặc xóa sản phẩm
4. Frontend cập nhật cart store và localStorage
5. Frontend tính toán tổng tiền, thuế, phí vận chuyển

**Checkout:**

1. User tiến hành thanh toán
2. Frontend hiển thị form thông tin giao hàng
3. User điền thông tin và chọn phương thức thanh toán
4. Frontend gửi request đến `/api/orders/create`
5. Backend tạo đơn hàng tạm thời trong database
6. Backend tạo Stripe Payment Intent
7. Backend trả về client secret
8. Frontend hiển thị form thanh toán Stripe
9. User hoàn tất thanh toán
10. Stripe callback đến backend
11. Backend cập nhật trạng thái đơn hàng
12. Frontend hiển thị trang xác nhận đơn hàng

### 4. 👨‍💼 Quản Lý Admin

**Đăng nhập admin:**

1. Admin truy cập `/admin`
2. Admin đăng nhập với tài khoản admin
3. Backend kiểm tra quyền admin
4. Backend trả về token với role admin
5. Frontend chuyển đến dashboard admin

**Quản lý sản phẩm:**

1. Admin xem danh sách sản phẩm
2. Admin có thể thêm, sửa, xóa sản phẩm
3. Admin upload hình ảnh sản phẩm
4. Backend lưu hình ảnh và cập nhật database
5. Admin có thể quản lý variants và attributes

**Quản lý đơn hàng:**

1. Admin xem danh sách đơn hàng
2. Admin có thể cập nhật trạng thái đơn hàng
3. Backend cập nhật database và gửi email thông báo
4. Admin có thể xem chi tiết đơn hàng

**Xem báo cáo:**

1. Admin truy cập dashboard
2. Backend tính toán các metrics (doanh thu, đơn hàng, sản phẩm bán chạy)
3. Backend trả về dữ liệu báo cáo
4. Frontend hiển thị charts và statistics

### 5. 🤖 Tương Tác với AI Chatbot

**Khởi tạo chatbot:**

1. User truy cập website
2. Frontend kiểm tra Gemini API key
3. Nếu có key, chatbot hiển thị "Gemini AI Active"
4. Nếu không có key, chatbot hiển thị "Demo Mode"

**Tương tác với chatbot:**

1. User click vào icon chat
2. Frontend hiển thị chat widget
3. User gửi câu hỏi
4. Frontend gửi request đến `/api/chat/message`
5. Backend lấy context sản phẩm từ database
6. Backend gửi prompt + context đến Gemini API
7. Gemini AI trả về response
8. Backend format và trả về cho frontend
9. Frontend hiển thị response trong chat widget

**Fallback mode:**

1. Nếu Gemini API không hoạt động
2. Backend sử dụng mock responses
3. Frontend hiển thị "Demo Mode"

## 🔄 Data Flow

### Frontend → Backend

1. **API Requests**: Frontend gửi HTTP requests đến backend API

   - Authentication header với JWT token
   - Request body với data (JSON)
   - Query parameters cho filtering, sorting, pagination

2. **File Uploads**: Frontend gửi multipart/form-data

   - Product images
   - User avatars

3. **WebSockets**: Real-time updates (nếu có)
   - Order status updates
   - Chat messages

### Backend → Database

1. **CRUD Operations**: Backend thực hiện các thao tác CRUD

   - Create: INSERT queries
   - Read: SELECT queries với JOIN
   - Update: UPDATE queries
   - Delete: DELETE queries (hoặc soft delete)

2. **Transactions**: Đảm bảo tính toàn vẹn dữ liệu

   - Order creation
   - Inventory updates

3. **Migrations**: Cập nhật schema database
   - Add/modify tables
   - Add/modify columns

### Backend → External Services

1. **Payment Processing**: Tích hợp với Stripe

   - Create payment intents
   - Handle webhooks
   - Process refunds

2. **AI Integration**: Tích hợp với Gemini AI

   - Send prompts
   - Receive responses
   - Context management

3. **Email Service**: Gửi email thông báo
   - Order confirmations
   - Password resets
   - Marketing emails

## 🔒 Security Flow

1. **Authentication**:

   - JWT tokens với expiration
   - Refresh token mechanism
   - Secure HTTP-only cookies

2. **Authorization**:

   - Role-based access control (RBAC)
   - Permission checks trong middlewares
   - Protected routes

3. **Data Protection**:
   - Input validation
   - SQL injection prevention
   - XSS protection
   - CSRF protection

## 🚀 Deployment Flow

1. **Development**:

   - Local development với hot reloading
   - Environment variables cho configuration

2. **Testing**:

   - Unit tests cho components và services
   - Integration tests cho API endpoints
   - E2E tests cho user flows

3. **Production**:
   - Build optimized bundles
   - Serve static assets từ CDN
   - Database migrations
   - Environment-specific configuration

## 📱 Responsive Design Flow

1. **Mobile First**:

   - Design bắt đầu từ mobile
   - Progressive enhancement cho larger screens

2. **Breakpoints**:

   - Small: < 640px (mobile)
   - Medium: 640px - 768px (tablet portrait)
   - Large: 768px - 1024px (tablet landscape)
   - XL: 1024px - 1280px (desktop)
   - 2XL: > 1280px (large desktop)

3. **Layout Adjustments**:
   - Stack layout trên mobile
   - Grid layout trên desktop
   - Collapsible navigation trên mobile
   - Sidebar navigation trên desktop

## 🌐 Internationalization (i18n) Flow

1. **Language Detection**:

   - Auto-detect từ browser settings
   - User có thể override

2. **Translation Loading**:

   - Lazy load translation files
   - Fallback đến default language

3. **Content Rendering**:
   - Translate text với i18n hooks
   - Format dates, numbers, currencies theo locale

## 🎯 Tóm Tắt Luồng Hoạt Động

1. **User Access**: User truy cập website
2. **Authentication**: User đăng nhập/đăng ký
3. **Product Browsing**: User xem và tìm kiếm sản phẩm
4. **Shopping Cart**: User thêm sản phẩm vào giỏ hàng
5. **Checkout**: User tiến hành thanh toán
6. **Order Confirmation**: User nhận xác nhận đơn hàng
7. **Admin Management**: Admin quản lý sản phẩm, đơn hàng
8. **AI Assistance**: Chatbot hỗ trợ user trong quá trình mua sắm

Mỗi bước trong luồng hoạt động đều được thiết kế để tối ưu trải nghiệm người dùng, đảm bảo hiệu suất và bảo mật.
