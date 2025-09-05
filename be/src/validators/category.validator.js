const Joi = require('joi');

// Create/Update category validation schema
const categorySchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Tên danh mục không được để trống',
    'any.required': 'Tên danh mục là trường bắt buộc',
  }),
  description: Joi.string().allow('').optional(),
  image: Joi.string().allow('').optional(),
  parentId: Joi.string().uuid().allow(null).optional(),
  isActive: Joi.boolean().default(true),
  sortOrder: Joi.number().integer().default(0),
});

module.exports = {
  categorySchema,
};
