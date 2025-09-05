'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Check if columns already exist
    const tableDescription = await queryInterface.describeTable('product_attributes');

    // Add new columns to product_attributes if they don't exist
    if (!tableDescription.type) {
      await queryInterface.addColumn('product_attributes', 'type', {
        type: Sequelize.ENUM('color', 'size', 'material', 'custom'),
        allowNull: false,
        defaultValue: 'custom',
      });
    }

    if (!tableDescription.required) {
      await queryInterface.addColumn('product_attributes', 'required', {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      });
    }

    if (!tableDescription.sort_order) {
      await queryInterface.addColumn('product_attributes', 'sort_order', {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      });
    }

    // Update values column to JSONB if it's not already JSONB
    if (tableDescription.values && tableDescription.values.type !== 'JSONB') {
      await queryInterface.changeColumn('product_attributes', 'values', {
        type: Sequelize.JSONB,
        allowNull: false,
        defaultValue: [],
      });
    }

    // Add indexes if they don't exist
    try {
      await queryInterface.addIndex('product_attributes', ['type']);
    } catch (error) {
      // Index might already exist
    }

    try {
      await queryInterface.addIndex('product_attributes', ['required']);
    } catch (error) {
      // Index might already exist
    }

    try {
      await queryInterface.addIndex('product_attributes', ['sort_order']);
    } catch (error) {
      // Index might already exist
    }
  },

  async down(queryInterface, Sequelize) {
    // Check if columns exist before removing
    const tableDescription = await queryInterface.describeTable('product_attributes');

    if (tableDescription.type) {
      await queryInterface.removeColumn('product_attributes', 'type');
    }

    if (tableDescription.required) {
      await queryInterface.removeColumn('product_attributes', 'required');
    }

    if (tableDescription.sort_order) {
      await queryInterface.removeColumn('product_attributes', 'sort_order');
    }

    // Revert values column back to ARRAY if it exists
    if (tableDescription.values) {
      await queryInterface.changeColumn('product_attributes', 'values', {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
      });
    }
  },
};
