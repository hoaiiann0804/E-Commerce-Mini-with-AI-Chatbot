'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('warranty_packages', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      duration_months: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      price: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0,
      },
      terms: {
        type: Sequelize.JSONB,
        defaultValue: {},
      },
      coverage: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: [],
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
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
    await queryInterface.addIndex('warranty_packages', ['is_active']);
    await queryInterface.addIndex('warranty_packages', ['sort_order']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('warranty_packages');
  },
};
