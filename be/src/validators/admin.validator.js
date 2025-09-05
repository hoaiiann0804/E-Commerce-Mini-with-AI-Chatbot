const { body, query, param } = require('express-validator');

const createProductValidation = [
  body('name')
    .notEmpty()
    .withMessage('Tên sản phẩm là bắt buộc')
    .isLength({ min: 2, max: 200 })
    .withMessage('Tên sản phẩm phải từ 2-200 ký tự'),

  body('description').notEmpty().withMessage('Mô tả chi tiết là bắt buộc'),

  body('shortDescription').notEmpty().withMessage('Mô tả ngắn là bắt buộc'),

  body('price')
    .isFloat({ min: 0 })
    .withMessage('Giá sản phẩm phải là số dương'),

  body('compareAtPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Giá so sánh phải là số dương'),

  body('comparePrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Giá so sánh phải là số dương'),

  body('stockQuantity')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Số lượng tồn kho phải là số nguyên không âm'),

  body('inStock')
    .optional()
    .isBoolean()
    .withMessage('inStock phải là true/false'),

  body('featured')
    .optional()
    .isBoolean()
    .withMessage('featured phải là true/false'),

  body('images').optional().isArray().withMessage('Hình ảnh phải là một mảng'),

  body('searchKeywords')
    .optional()
    .isArray()
    .withMessage('Từ khóa tìm kiếm phải là một mảng'),

  body('seoKeywords')
    .optional()
    .isArray()
    .withMessage('SEO keywords phải là một mảng'),

  body('categoryIds')
    .optional()
    .isArray()
    .withMessage('Danh mục phải là một mảng'),
];

const updateProductValidation = [
  param('id').isUUID().withMessage('Product ID không hợp lệ'),

  body('name')
    .optional()
    .isLength({ min: 2, max: 200 })
    .withMessage('Tên sản phẩm phải từ 2-200 ký tự'),

  body('description').optional(),

  body('shortDescription').optional(),

  body('price')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Giá sản phẩm phải là số dương'),

  body('compareAtPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Giá so sánh phải là số dương'),

  body('comparePrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Giá so sánh phải là số dương'),

  body('stockQuantity')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Số lượng tồn kho phải là số nguyên không âm'),

  body('inStock')
    .optional()
    .isBoolean()
    .withMessage('inStock phải là true/false'),

  body('featured')
    .optional()
    .isBoolean()
    .withMessage('featured phải là true/false'),

  body('images').optional().isArray().withMessage('Hình ảnh phải là một mảng'),

  body('searchKeywords')
    .optional()
    .isArray()
    .withMessage('Từ khóa tìm kiếm phải là một mảng'),

  body('seoKeywords')
    .optional()
    .isArray()
    .withMessage('SEO keywords phải là một mảng'),

  body('categoryIds')
    .optional()
    .isArray()
    .withMessage('Danh mục phải là một mảng'),
];

const updateUserValidation = [
  param('id').isUUID().withMessage('User ID không hợp lệ'),

  body('firstName')
    .optional()
    .isLength({ min: 2, max: 50 })
    .withMessage('Tên phải từ 2-50 ký tự'),

  body('lastName')
    .optional()
    .isLength({ min: 2, max: 50 })
    .withMessage('Họ phải từ 2-50 ký tự'),

  body('phone').optional(),

  body('role')
    .optional()
    .isIn(['customer', 'admin', 'manager'])
    .withMessage('Role không hợp lệ'),

  body('isEmailVerified')
    .optional()
    .isBoolean()
    .withMessage('isEmailVerified phải là boolean'),

  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive phải là boolean'),
];

const updateOrderStatusValidation = [
  param('id').isUUID().withMessage('Order ID không hợp lệ'),

  body('status')
    .isIn(['pending', 'processing', 'shipped', 'delivered', 'cancelled'])
    .withMessage('Trạng thái đơn hàng không hợp lệ'),

  body('note')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Ghi chú không được vượt quá 500 ký tự'),
];

const paginationValidation = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Trang phải là số nguyên dương'),

  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit phải là số nguyên từ 1-100'),

  query('sortBy').optional().isString().withMessage('SortBy phải là chuỗi'),

  query('sortOrder')
    .optional()
    .isIn(['ASC', 'DESC', 'asc', 'desc'])
    .withMessage('SortOrder phải là ASC hoặc DESC'),
];

const statsValidation = [
  query('startDate')
    .optional()
    .isISO8601()
    .withMessage('Ngày bắt đầu không hợp lệ'),

  query('endDate')
    .optional()
    .isISO8601()
    .withMessage('Ngày kết thúc không hợp lệ'),

  query('groupBy')
    .optional()
    .isIn(['hour', 'day', 'week', 'month'])
    .withMessage('GroupBy phải là hour, day, week hoặc month'),
];

const deleteValidation = [param('id').isUUID().withMessage('ID không hợp lệ')];

const getByIdValidation = [param('id').isUUID().withMessage('ID không hợp lệ')];

module.exports = {
  createProductValidation,
  updateProductValidation,
  updateUserValidation,
  updateOrderStatusValidation,
  paginationValidation,
  statsValidation,
  deleteValidation,
  getByIdValidation,
};
