const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Review = sequelize.define(
  'Review',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    dislikes: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: []
    },
  },
  {
    tableName: 'reviews',
    timestamps: true,
  }
);

module.exports = Review;
