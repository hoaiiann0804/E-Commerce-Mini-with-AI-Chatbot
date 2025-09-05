const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const ProductSpecification = sequelize.define(
  'ProductSpecification',
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
    value: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'General',
    },
    sortOrder: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      field: 'sort_order',
    },
  },
  {
    tableName: 'product_specifications',
    timestamps: true,
  }
);

module.exports = ProductSpecification;
