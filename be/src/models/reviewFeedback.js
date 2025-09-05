const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const ReviewFeedback = sequelize.define(
  'ReviewFeedback',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    reviewId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    isHelpful: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    tableName: 'review_feedbacks',
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['review_id', 'user_id'],
      },
    ],
  }
);

module.exports = ReviewFeedback;
