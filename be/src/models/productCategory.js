const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const ProductCategory = sequelize.define(
  'ProductCategory',
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
    categoryId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    tableName: 'product_categories',
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['product_id', 'category_id'],
      },
    ],
  }
);

module.exports = ProductCategory;
