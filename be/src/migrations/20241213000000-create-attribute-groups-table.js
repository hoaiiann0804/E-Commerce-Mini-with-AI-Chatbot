'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('attribute_groups', {
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
      type: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'custom',
        validate: {
          isIn: [['color', 'config', 'storage', 'size', 'custom']],
        },
      },
      is_required: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      sort_order: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
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
    await queryInterface.addIndex('attribute_groups', ['type']);
    await queryInterface.addIndex('attribute_groups', ['is_active']);
    await queryInterface.addIndex('attribute_groups', ['sort_order']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('attribute_groups');
  },
};
