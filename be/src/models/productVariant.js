const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const ProductVariant = sequelize.define(
  'ProductVariant',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sku: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    attributes: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: {},
    },
    // New field for hierarchical attributes
    attributeValues: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: {},
      field: 'attribute_values',
    },
    price: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    stockQuantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
    // Display name for variant (auto-generated)
    displayName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // Sort order for variants
    sortOrder: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    // Whether this is the default variant
    isDefault: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    // Availability status
    isAvailable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    // Compare at price for variant
    compareAtPrice: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: true,
      field: 'compare_at_price',
    },
    // Variant specifications (override product specs)
    specifications: {
      type: DataTypes.JSONB,
      defaultValue: {},
    },
  },
  {
    tableName: 'product_variants',
    timestamps: true,
    hooks: {
      beforeCreate: async (variant) => {
        // Auto-generate display name based on attributes
        if (!variant.displayName && variant.attributeValues) {
          const productNameService = require('../services/productNameGenerator.service');
          const Product = require('./product');

          try {
            const product = await Product.findByPk(variant.productId);
            if (product && product.baseName) {
              const attributeValueIds = Object.values(
                variant.attributeValues
              ).filter((id) => id);
              if (attributeValueIds.length > 0) {
                const generatedName =
                  await productNameService.generateProductName(
                    product.baseName,
                    attributeValueIds
                  );
                variant.displayName = generatedName
                  .replace(product.baseName, '')
                  .trim();
                variant.name = generatedName;
              }
            }
          } catch (error) {
            console.log('Could not auto-generate variant name:', error.message);
          }
        }
      },
      beforeUpdate: async (variant) => {
        // Auto-regenerate display name if attributes changed
        if (variant.changed('attributeValues') && variant.attributeValues) {
          const productNameService = require('../services/productNameGenerator.service');
          const Product = require('./product');

          try {
            const product = await Product.findByPk(variant.productId);
            if (product && product.baseName) {
              const attributeValueIds = Object.values(
                variant.attributeValues
              ).filter((id) => id);
              if (attributeValueIds.length > 0) {
                const generatedName =
                  await productNameService.generateProductName(
                    product.baseName,
                    attributeValueIds
                  );
                variant.displayName = generatedName
                  .replace(product.baseName, '')
                  .trim();
                variant.name = generatedName;
              }
            }
          } catch (error) {
            console.log(
              'Could not auto-regenerate variant name:',
              error.message
            );
          }
        }
      },
    },
  }
);

module.exports = ProductVariant;
