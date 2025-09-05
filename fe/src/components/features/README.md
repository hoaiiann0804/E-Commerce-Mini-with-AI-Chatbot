# Review System Components

Hệ thống đánh giá đã được tích hợp với authentication và backend API. Dưới đây là hướng dẫn sử dụng:

## Components

### 1. ProductReviews (Main Component)

Component chính để hiển thị tất cả review cho một sản phẩm.

```tsx
import ProductReviews from '@/components/features/ProductReviews';

function ProductDetailPage() {
  return (
    <div>
      {/* Product info */}

      {/* Reviews section */}
      <ProductReviews
        productId="product-uuid"
        averageRating={4.5}
        totalReviews={123}
      />
    </div>
  );
}
```

### 2. ReviewSection

Component hiển thị form review và danh sách review.

```tsx
import ReviewSection from '@/components/features/ReviewSection';

function ReviewsTab() {
  return <ReviewSection productId="product-uuid" />;
}
```

### 3. ReviewForm

Component form để viết review (chỉ user đã đăng nhập mới thấy).

```tsx
import ReviewForm from '@/components/features/ReviewForm';

function WriteReviewModal() {
  return (
    <ReviewForm
      productId="product-uuid"
      onSubmitSuccess={() => {
        // Close modal, refresh reviews, etc.
      }}
      onCancel={() => {
        // Close form
      }}
    />
  );
}
```

### 4. ReviewList

Component hiển thị danh sách review với filter và pagination.

```tsx
import ReviewList from '@/components/features/ReviewList';

function ReviewsPage() {
  return <ReviewList productId="product-uuid" />;
}
```

### 5. ReviewSummary

Component hiển thị tổng quan đánh giá (rating distribution, statistics).

```tsx
import ReviewSummary from '@/components/features/ReviewSummary';

function ProductSidebar() {
  return (
    <ReviewSummary
      productId="product-uuid"
      averageRating={4.5}
      totalReviews={123}
    />
  );
}
```

## Features

### Authentication Integration

- Chỉ user đã đăng nhập mới có thể viết review
- User chưa đăng nhập sẽ thấy nút "Đăng nhập"
- Backend check user đã mua sản phẩm chưa trước khi cho phép review

### API Integration

- Tự động gọi API để lấy reviews
- Realtime update khi có review mới
- Support pagination và filtering
- Mark review as helpful/unhelpful

### Form Validation

- Rating: bắt buộc (1-5 sao)
- Title: bắt buộc, 5-100 ký tự
- Comment: bắt buộc, 10-1000 ký tự
- Images: tùy chọn, tối đa 3 ảnh

### Backend Features

- Check user đã mua sản phẩm
- Check user chưa review sản phẩm này
- Auto-verify review nếu user đã mua
- Update product rating khi có review mới
- Support image upload

## Backend Endpoints Used

```
GET /api/reviews/product/:productId - Lấy reviews của sản phẩm
POST /api/reviews - Tạo review mới (auth required)
PUT /api/reviews/:id - Cập nhật review (auth required)
DELETE /api/reviews/:id - Xóa review (auth required)
PUT /api/reviews/:id/helpful - Mark review helpful (auth required)
```

## Error Handling

- API errors sẽ hiển thị toast notification
- Form validation errors hiển thị dưới các field
- Loading states với skeleton UI
- Fallback cho empty states

## Toast Notifications

Review system sử dụng react-hot-toast:

```tsx
import { toast } from 'react-hot-toast';

// Success
toast.success('Đánh giá của bạn đã được gửi thành công!');

// Error
toast.error('Có lỗi xảy ra khi gửi đánh giá. Vui lòng thử lại.');
```

## State Management

Review data được cache bởi RTK Query:

- Auto invalidate khi có update
- Optimistic updates cho better UX
- Background refetch khi cần

## Responsive Design

Tất cả components đều responsive:

- Mobile-first approach
- Touch-friendly buttons
- Adaptive layouts
- Dark mode support
