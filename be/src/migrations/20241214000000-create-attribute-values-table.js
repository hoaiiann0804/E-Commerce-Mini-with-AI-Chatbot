'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('attribute_values', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      attribute_group_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'attribute_groups',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      value: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      color_code: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
          isValidColor(value) {
            if (value && !/^#[0-9A-F]{6}$/i.test(value)) {
              throw new Error('Color code must be in hex format (e.g., #FF0000)');
            }
          },
        },
      },
      image_url: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      price_adjustment: {
        type: Sequelize.DECIMAL(12, 2),
        defaultValue: 0,
      },
      sort_order: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      affects_name: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      name_template: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: 'Template for product name (e.g., "I9", "RTX 4080", "32GB")',
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

    // Add indexes
    await queryInterface.addIndex('attribute_values', ['attribute_group_id']);
    await queryInterface.addIndex('attribute_values', ['is_active']);
    await queryInterface.addIndex('attribute_values', ['sort_order']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('attribute_values');
  },
};
