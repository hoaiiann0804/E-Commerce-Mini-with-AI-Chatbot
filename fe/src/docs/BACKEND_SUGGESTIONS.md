# Backend API Improvements

## 1. Include Variants in Product List API

**Current Issue:**

- API `/products` không trả về variants
- Phải gọi API riêng `/products/{id}/variants` để lấy variants
- Gây ra nhiều API calls khi hiển thị khoảng giá

**Suggestion:**

```json
{
  "status": "success",
  "data": {
    "products": [
      {
        "id": "product-id",
        "name": "Product Name",
        "price": "1000000.00",
        "variants": [
          {
            "id": "variant-id",
            "name": "Variant Name",
            "price": "900000.00",
            "stockQuantity": 10,
            "attributes": { "color": "red" }
          }
        ]
      }
    ]
  }
}
```

**Benefits:**

- Giảm số API calls
- Có thể hiển thị khoảng giá ngay lập tức
- Better user experience

## 2. Default Filter for Product Status

**Current Issue:**

- API trả về cả sản phẩm `inactive`
- Frontend phải filter hoặc user thấy sản phẩm không available

**Suggestion:**

- Mặc định chỉ trả về sản phẩm `active`
- Cho phép query param `status=all` để lấy tất cả
- Admin API có thể có behavior khác

**Implementation:**

```javascript
// Frontend đã thêm default filter
params.append('status', 'active');
```

## 3. Price Range Calculation

**Current Behavior:**

- Giá hiển thị từ field `price` cơ bản
- Không reflect giá thực tế từ variants

**Suggested Behavior:**

- Nếu có variants: hiển thị "Từ [min_price] - [max_price]"
- Nếu không có variants: hiển thị giá cơ bản
- Backend có thể tính sẵn `minPrice`, `maxPrice` để optimize

## 4. Stock Quantity Aggregation

**Current Issue:**

- `stockQuantity` từ sản phẩm chính có thể không chính xác
- Stock thực tế phụ thuộc vào variants

**Suggestion:**

```json
{
  "stockQuantity": 25, // Tổng stock từ tất cả variants
  "stockStatus": "inStock", // "inStock", "lowStock", "outOfStock"
  "variants": [
    {
      "stockQuantity": 10,
      "stockStatus": "inStock"
    }
  ]
}
```
