'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add new fields to products table
    await queryInterface.addColumn('products', 'base_name', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('products', 'is_variant_product', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });

    // Add new fields to product_variants table
    await queryInterface.addColumn('product_variants', 'compare_at_price', {
      type: Sequelize.DECIMAL(12, 2),
      allowNull: true,
    });

    await queryInterface.addColumn('product_variants', 'specifications', {
      type: Sequelize.JSONB,
      defaultValue: {},
    });

    // Update existing products to set base_name = name
    await queryInterface.sequelize.query(`
      UPDATE products SET base_name = name WHERE base_name IS NULL;
    `);
  },

  down: async (queryInterface, Sequelize) => {
    // Remove added columns
    await queryInterface.removeColumn('products', 'base_name');
    await queryInterface.removeColumn('products', 'is_variant_product');
    await queryInterface.removeColumn('product_variants', 'compare_at_price');
    await queryInterface.removeColumn('product_variants', 'specifications');
  },
};
