# Admin Product Management

## Tổng quan

Module quản lý sản phẩm dành cho admin với đầy đủ chức năng CRUD (Create, Read, Update, Delete).

## Cách sử dụng

### 1. Truy cập trang quản lý sản phẩm

Điều hướng đến: `http://localhost:5175/admin/products`

**Yêu cầu:** Phải đăng nhập với tài khoản có role `admin` hoặc `manager`.

### 2. Các chức năng chính

#### a) Xem danh sách sản phẩm

- Hiển thị bảng danh sách sản phẩm với thông tin: tên, giá, danh mục, số lượng tồn kho, trạng thái
- Hỗ trợ tìm kiếm theo tên sản phẩm
- Lọc theo danh mục và trạng thái
- Sắp xếp theo các trường: tên, giá, số lượng tồn kho, trạng thái
- Phân trang với 10 sản phẩm mỗi trang

#### b) Tạo sản phẩm mới

Có 2 cách để tạo sản phẩm:

**Cách 1: Tạo nhanh (Modal)**

- Nhấn nút "Thêm nhanh"
- Điền form trong modal popup
- Phù hợp cho việc thêm sản phẩm đơn giản

**Cách 2: Tạo chi tiết (Page riêng)**

- Nhấn nút "Tạo sản phẩm mới"
- Điều hướng đến trang `http://localhost:5175/admin/products/create`
- Form đầy đủ với nhiều tùy chọn nâng cao

#### c) Sửa sản phẩm

- Nhấn nút "Sửa" trên từng dòng sản phẩm
- Modal sửa thông tin sản phẩm

#### d) Xóa sản phẩm

- Nhấn nút "Xóa" trên từng dòng sản phẩm
- Xác nhận xóa trong modal
- **Lưu ý:** Hành động này không thể hoàn tác

### 3. Thông tin chi tiết form tạo sản phẩm

#### Thông tin cơ bản (Bắt buộc)

- **Tên sản phẩm:** Tên hiển thị của sản phẩm
- **SKU:** Mã sản phẩm duy nhất
- **Mô tả:** Mô tả chi tiết về sản phẩm

#### Giá và kho hàng

- **Giá bán:** Giá hiện tại của sản phẩm (VND)
- **Giá so sánh:** Giá gốc để hiển thị khuyến mãi (tùy chọn)
- **Số lượng tồn kho:** Số lượng sản phẩm có sẵn

#### Phân loại và trạng thái

- **Danh mục:** Chọn một hoặc nhiều danh mục (giữ Ctrl/Cmd để chọn nhiều)
- **Trạng thái:**
  - `Active`: Sản phẩm hoạt động, hiển thị trên website
  - `Inactive`: Tạm ẩn sản phẩm
  - `Draft`: Bản nháp, chưa công khai

#### Hình ảnh

- Nhập URL của hình ảnh, cách nhau bằng dấu phẩy
- Hình đầu tiên sẽ là hình đại diện

#### Thuộc tính sản phẩm (Tùy chọn)

- Thêm các thuộc tính như: Màu sắc, Kích thước, Chất liệu...
- Format: `Tên thuộc tính` - `Giá trị`

#### Biến thể sản phẩm (Tùy chọn)

- Tạo các phiên bản khác nhau của sản phẩm
- Mỗi biến thể có thể có giá và số lượng riêng
- VD: Size S, M, L với giá khác nhau

### 4. API Endpoints

Module này sử dụng các API endpoints sau:

- `GET /api/admin/products` - Lấy danh sách sản phẩm
- `POST /api/admin/products` - Tạo sản phẩm mới
- `PUT /api/admin/products/:id` - Cập nhật sản phẩm
- `DELETE /api/admin/products/:id` - Xóa sản phẩm

### 5. Cấu trúc Files

```
frontend/src/
├── pages/admin/
│   ├── ProductsPage.tsx          # Trang danh sách sản phẩm
│   ├── CreateProductPage.tsx     # Trang tạo sản phẩm chi tiết
│   └── README.md                 # File này
├── components/admin/
│   └── CreateProductForm.tsx     # Form tạo sản phẩm (modal)
├── services/
│   └── adminProductApi.ts        # API service cho admin products
└── routes/
    └── AppRoutes.tsx             # Định tuyến routes
```

### 6. Lưu ý quan trọng

- **Quyền truy cập:** Chỉ admin/manager mới có thể truy cập
- **Validation:** Form có validation phía client, server cũng validate
- **Loading states:** UI hiển thị trạng thái loading khi thao tác
- **Error handling:** Hiển thị lỗi chi tiết khi có vấn đề
- **Real-time update:** Danh sách tự động cập nhật sau thao tác

### 7. Troubleshooting

**Lỗi 401 Unauthorized:**

- Kiểm tra đã đăng nhập với tài khoản admin chưa
- Token có thể đã hết hạn, thử đăng nhập lại

**Lỗi 403 Forbidden:**

- Tài khoản không có quyền admin/manager
- Liên hệ admin để cấp quyền

**Lỗi validation:**

- Kiểm tra các trường bắt buộc đã điền chưa
- Đảm bảo format dữ liệu đúng (giá > 0, số lượng >= 0)

**Không load được danh sách:**

- Kiểm tra kết nối backend
- Xem console để debug API error
