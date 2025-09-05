const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const ProductWarranty = sequelize.define(
  'ProductWarranty',
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
    warrantyPackageId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'warranty_package_id',
    },
    isDefault: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: 'is_default',
    },
  },
  {
    tableName: 'product_warranties',
    timestamps: true,
  }
);

module.exports = ProductWarranty;
