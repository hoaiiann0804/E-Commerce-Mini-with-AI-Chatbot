const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Wishlist = sequelize.define(
  'Wishlist',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    tableName: 'wishlists',
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['user_id', 'product_id'],
      },
    ],
  }
);

module.exports = Wishlist;
