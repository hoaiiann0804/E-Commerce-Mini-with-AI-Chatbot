'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      slug: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      short_description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      price: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
      },
      compare_at_price: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: true,
      },
      images: {
        type: Sequelize.TEXT,
        defaultValue: '[]',
      },
      thumbnail: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      in_stock: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      stock_quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      sku: {
        type: Sequelize.TEXT,
        allowNull: true,
        unique: true,
      },
      status: {
        type: Sequelize.ENUM('active', 'inactive', 'draft'),
        defaultValue: 'active',
      },
      featured: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      search_keywords: {
        type: Sequelize.TEXT,
        defaultValue: '[]',
      },
      seo_title: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      seo_description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      seo_keywords: {
        type: Sequelize.TEXT,
        defaultValue: '[]',
      },
      specifications: {
        type: Sequelize.TEXT,
        defaultValue: '[]',
      },
      condition: {
        type: Sequelize.ENUM('new', 'like-new', 'used', 'refurbished'),
        defaultValue: 'new',
      },
      base_name: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      is_variant_product: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });

    // Add indexes for better performance
    await queryInterface.addIndex('products', ['slug']);
    await queryInterface.addIndex('products', ['status']);
    await queryInterface.addIndex('products', ['featured']);
    await queryInterface.addIndex('products', ['in_stock']);
    await queryInterface.addIndex('products', ['sku']);
    await queryInterface.addIndex('products', ['condition']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('products');
  },
};
