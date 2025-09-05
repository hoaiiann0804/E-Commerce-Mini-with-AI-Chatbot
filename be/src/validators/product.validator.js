const Joi = require('joi');

// Create/Update product validation schema
const productSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Tên sản phẩm không được để trống',
    'any.required': 'Tên sản phẩm là trường bắt buộc',
  }),
  description: Joi.string().required().messages({
    'string.empty': 'Mô tả không được để trống',
    'any.required': 'Mô tả là trường bắt buộc',
  }),
  shortDescription: Joi.string().required().messages({
    'string.empty': 'Mô tả ngắn không được để trống',
    'any.required': 'Mô tả ngắn là trường bắt buộc',
  }),
  price: Joi.number().min(0).required().messages({
    'number.base': 'Giá phải là số',
    'number.min': 'Giá không được nhỏ hơn 0',
    'any.required': 'Giá là trường bắt buộc',
  }),
  compareAtPrice: Joi.number().min(0).allow(null).optional(),
  images: Joi.array().items(Joi.string()).default([]),
  thumbnail: Joi.string().allow('').optional(),
  categoryIds: Joi.array().items(Joi.string().uuid()).optional(),
  inStock: Joi.boolean().default(true),
  stockQuantity: Joi.number().integer().min(0).default(0),
  featured: Joi.boolean().default(false),
  searchKeywords: Joi.array().items(Joi.string()).default([]),
  seoTitle: Joi.string().allow('').optional(),
  seoDescription: Joi.string().allow('').optional(),
  seoKeywords: Joi.array().items(Joi.string()).default([]),

  // New fields for laptop/computer products
  brand: Joi.string().allow('').optional(),
  model: Joi.string().allow('').optional(),
  condition: Joi.string()
    .valid('new', 'like-new', 'used', 'refurbished')
    .default('new'),
  warrantyMonths: Joi.number().integer().min(0).max(120).default(12),
  specifications: Joi.object().default({}),

  attributes: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required(),
        values: Joi.array().items(Joi.string()).required(),
      })
    )
    .optional(),
  variants: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required(),
        sku: Joi.string().allow('').optional(),
        attributes: Joi.object().pattern(Joi.string(), Joi.string()).required(),
        price: Joi.number().min(0).required(),
        stockQuantity: Joi.number().integer().min(0).default(0),
        images: Joi.array().items(Joi.string()).default([]),
        displayName: Joi.string().allow('').optional(),
        sortOrder: Joi.number().integer().min(0).default(0),
        isDefault: Joi.boolean().default(false),
        isAvailable: Joi.boolean().default(true),
      })
    )
    .optional(),

  // Warranty packages
  warrantyPackageIds: Joi.array().items(Joi.string().uuid()).optional(),
});

module.exports = {
  productSchema,
};
