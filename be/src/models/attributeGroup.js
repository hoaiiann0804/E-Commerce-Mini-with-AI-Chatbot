const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const AttributeGroup = sequelize.define(
  'AttributeGroup',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'custom',
      validate: {
        isIn: [['color', 'config', 'storage', 'size', 'custom']],
      },
    },
    isRequired: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: 'is_required',
    },
    sortOrder: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      field: 'sort_order',
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      field: 'is_active',
    },
  },
  {
    tableName: 'attribute_groups',
    timestamps: true,
  }
);

module.exports = AttributeGroup;
