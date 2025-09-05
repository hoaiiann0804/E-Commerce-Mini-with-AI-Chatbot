'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Check if sku column exists, if not add it
    const [results] = await queryInterface.sequelize.query(
      `SELECT column_name FROM information_schema.columns WHERE table_name='products' AND column_name='sku';`
    );

    if (results.length === 0) {
      await queryInterface.addColumn('products', 'sku', {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      });
    }

    // Check if status column exists, if not add it
    const [statusResults] = await queryInterface.sequelize.query(
      `SELECT column_name FROM information_schema.columns WHERE table_name='products' AND column_name='status';`
    );

    if (statusResults.length === 0) {
      // Create ENUM type first
      await queryInterface.sequelize.query(`
        CREATE TYPE enum_products_status AS ENUM ('active', 'inactive', 'draft');
      `);

      await queryInterface.addColumn('products', 'status', {
        type: Sequelize.ENUM('active', 'inactive', 'draft'),
        defaultValue: 'active',
        allowNull: false,
      });

      // Set default values for existing products
      await queryInterface.sequelize.query(`
        UPDATE products 
        SET status = CASE 
          WHEN "in_stock" = true THEN 'active'::enum_products_status
          ELSE 'inactive'::enum_products_status
        END
        WHERE status IS NULL
      `);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('products', 'sku');
    await queryInterface.removeColumn('products', 'status');

    // Drop the ENUM type
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_products_status";'
    );
  },
};
