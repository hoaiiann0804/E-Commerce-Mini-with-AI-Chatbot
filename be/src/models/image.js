const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Image = sequelize.define(
  'Image',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    originalName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'original_name',
    },
    fileName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      field: 'file_name',
    },
    filePath: {
      type: DataTypes.STRING(500),
      allowNull: false,
      field: 'file_path',
    },
    fileSize: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'file_size',
    },
    mimeType: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'mime_type',
    },
    width: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    category: {
      type: DataTypes.ENUM('product', 'thumbnail', 'user', 'review'),
      allowNull: false,
      defaultValue: 'product',
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: true,
      field: 'product_id',
      references: {
        model: 'products',
        key: 'id',
      },
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: true,
      field: 'user_id',
      references: {
        model: 'users',
        key: 'id',
      },
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      field: 'is_active',
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: 'updated_at',
    },
  },
  {
    tableName: 'images',
    timestamps: true,
    underscored: true,
    indexes: [
      {
        fields: ['product_id'],
      },
      {
        fields: ['user_id'],
      },
      {
        fields: ['category'],
      },
      {
        fields: ['is_active'],
      },
    ],
  }
);

module.exports = Image;
