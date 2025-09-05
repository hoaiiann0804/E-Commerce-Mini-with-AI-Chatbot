const Joi = require('joi');

// Review validation schema
const reviewSchema = Joi.object({
  productId: Joi.string().uuid().required().messages({
    'string.guid': 'ID sản phẩm không hợp lệ',
    'any.required': 'ID sản phẩm là trường bắt buộc',
  }),
  rating: Joi.number().integer().min(1).max(5).required().messages({
    'number.base': 'Đánh giá phải là số',
    'number.integer': 'Đánh giá phải là số nguyên',
    'number.min': 'Đánh giá phải từ 1 đến 5',
    'number.max': 'Đánh giá phải từ 1 đến 5',
    'any.required': 'Đánh giá là trường bắt buộc',
  }),
  title: Joi.string().required().messages({
    'string.empty': 'Tiêu đề không được để trống',
    'any.required': 'Tiêu đề là trường bắt buộc',
  }),
  comment: Joi.string().required().messages({
    'string.empty': 'Nội dung đánh giá không được để trống',
    'any.required': 'Nội dung đánh giá là trường bắt buộc',
  }),
  images: Joi.array().items(Joi.string().uri()).optional(),
});

// Review helpful validation schema
const reviewHelpfulSchema = Joi.object({
  helpful: Joi.boolean().required().messages({
    'boolean.base': 'Giá trị helpful phải là boolean',
    'any.required': 'Giá trị helpful là trường bắt buộc',
  }),
});

module.exports = {
  reviewSchema,
  reviewHelpfulSchema,
};
