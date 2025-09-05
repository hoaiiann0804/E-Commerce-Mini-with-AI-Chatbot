const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Cart = sequelize.define(
  'Cart',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: true
    },
    sessionId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('active', 'merged', 'converted', 'abandoned'),
      defaultValue: 'active'
    },
  },
  {
    tableName: 'carts',
    timestamps: true,
  }
);

module.exports = Cart;
