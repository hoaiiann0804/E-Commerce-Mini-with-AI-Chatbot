'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('product_attributes', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      product_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'products',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM('color', 'size', 'material', 'custom'),
        allowNull: false,
        defaultValue: 'custom',
      },
      values: {
        type: Sequelize.JSONB,
        allowNull: false,
        defaultValue: [],
      },
      required: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      sort_order: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
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
    await queryInterface.addIndex('product_attributes', ['product_id']);
    await queryInterface.addIndex('product_attributes', ['type']);
    await queryInterface.addIndex('product_attributes', ['sort_order']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('product_attributes');
  },
};
