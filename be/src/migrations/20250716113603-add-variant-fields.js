const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Check if columns already exist
    const productTable = await queryInterface.describeTable('products');
    const productVariantsTable = await queryInterface.describeTable('product_variants');

    if (!productTable.base_name) {
      await queryInterface.addColumn('products', 'base_name', {
        type: DataTypes.STRING,
        allowNull: true,
      });
    }

    if (!productTable.is_variant_product) {
      await queryInterface.addColumn('products', 'is_variant_product', {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      });
    }

    if (!productVariantsTable.compare_at_price) {
      await queryInterface.addColumn('product_variants', 'compare_at_price', {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: true,
      });
    }

    if (!productVariantsTable.specifications) {
      await queryInterface.addColumn('product_variants', 'specifications', {
        type: DataTypes.JSONB,
        defaultValue: {},
      });
    }

    // Update existing products to set base_name = name
    await queryInterface.sequelize.query(`
      UPDATE products SET base_name = name WHERE base_name IS NULL;
    `);
  },

  down: async (queryInterface, Sequelize) => {
    // Check if columns exist before removing
    const productTable = await queryInterface.describeTable('products');
    const productVariantsTable = await queryInterface.describeTable('product_variants');

    if (productTable.base_name) {
      await queryInterface.removeColumn('products', 'base_name');
    }

    if (productTable.is_variant_product) {
      await queryInterface.removeColumn('products', 'is_variant_product');
    }

    if (productVariantsTable.compare_at_price) {
      await queryInterface.removeColumn('product_variants', 'compare_at_price');
    }

    if (productVariantsTable.specifications) {
      await queryInterface.removeColumn('product_variants', 'specifications');
    }
  },
};
