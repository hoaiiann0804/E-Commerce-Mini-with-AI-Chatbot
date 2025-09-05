const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const CartItem = sequelize.define(
  'CartItem',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    cartId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    variantId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        min: 1,
      },
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    warrantyPackageIds: {
      type: DataTypes.ARRAY(DataTypes.UUID),
      allowNull: true,
      defaultValue: [],
      field: 'warranty_package_ids',
    },
  },
  {
    tableName: 'cart_items',
    timestamps: true,
  }
);

module.exports = CartItem;
