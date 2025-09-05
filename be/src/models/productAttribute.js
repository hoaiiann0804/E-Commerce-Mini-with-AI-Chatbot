const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const ProductAttribute = sequelize.define(
  'ProductAttribute',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'product_id',
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('color', 'size', 'material', 'custom'),
      allowNull: false,
      defaultValue: 'custom',
    },
    values: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: [],
    },
    required: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    sortOrder: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      field: 'sort_order',
    },
  },
  {
    tableName: 'product_attributes',
    timestamps: true,
  }
);

module.exports = ProductAttribute;
