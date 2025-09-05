const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const WarrantyPackage = sequelize.define(
  'WarrantyPackage',
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
    durationMonths: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'duration_months',
    },
    price: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
    terms: {
      type: DataTypes.JSONB,
      defaultValue: {},
    },
    coverage: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      field: 'is_active',
    },
    sortOrder: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      field: 'sort_order',
    },
  },
  {
    tableName: 'warranty_packages',
    timestamps: true,
  }
);

module.exports = WarrantyPackage;
