'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Check if table already exists
    let tableExists = false;
    try {
      await queryInterface.describeTable('product_warranties');
      tableExists = true;
    } catch (error) {
      tableExists = false;
    }

    if (!tableExists) {
      await queryInterface.createTable('product_warranties', {
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
        warranty_package_id: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'warranty_packages',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        is_default: {
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
    }

    // Add indexes for better performance if they don't exist
    try {
      await queryInterface.addIndex('product_warranties', ['product_id']);
    } catch (error) {
      // Index might already exist
    }

    try {
      await queryInterface.addIndex('product_warranties', [
        'warranty_package_id',
      ]);
    } catch (error) {
      // Index might already exist
    }

    try {
      await queryInterface.addIndex('product_warranties', ['is_default']);
    } catch (error) {
      // Index might already exist
    }

    // Add unique constraint to prevent duplicates if it doesn't exist
    try {
      await queryInterface.addIndex(
        'product_warranties',
        ['product_id', 'warranty_package_id'],
        {
          unique: true,
          name: 'unique_product_warranty',
        }
      );
    } catch (error) {
      // Index might already exist
    }
  },

  async down(queryInterface, Sequelize) {
    // Check if table exists before dropping
    try {
      await queryInterface.describeTable('product_warranties');
      await queryInterface.dropTable('product_warranties');
    } catch (error) {
      // Table might not exist, continue
    }
  },
};
