const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const ProductAttributeGroup = sequelize.define(
  'ProductAttributeGroup',
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
    attributeGroupId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'attribute_group_id',
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
  },
  {
    tableName: 'product_attribute_groups',
    timestamps: true,
  }
);

module.exports = ProductAttributeGroup;
