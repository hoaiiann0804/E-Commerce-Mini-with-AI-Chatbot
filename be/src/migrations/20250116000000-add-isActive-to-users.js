'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Check if column already exists
    const tableDescription = await queryInterface.describeTable('users');

    if (!tableDescription.isActive) {
      await queryInterface.addColumn('users', 'isActive', {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      });

      // Update existing users to be active by default
      await queryInterface.sequelize.query(
        'UPDATE users SET "isActive" = true WHERE "isActive" IS NULL'
      );
    }
  },

  async down(queryInterface, Sequelize) {
    // Check if column exists before removing
    const tableDescription = await queryInterface.describeTable('users');

    if (tableDescription.isActive) {
      await queryInterface.removeColumn('users', 'isActive');
    }
  },
};
