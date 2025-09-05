'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('images', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      original_name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      file_name: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
      },
      file_path: {
        type: Sequelize.STRING(500),
        allowNull: false,
      },
      file_size: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      mime_type: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      width: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      height: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      category: {
        type: Sequelize.ENUM('product', 'thumbnail', 'user', 'review'),
        allowNull: false,
        defaultValue: 'product',
      },
      product_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'products',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false,
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
    await queryInterface.addIndex('images', ['product_id'], {
      name: 'idx_images_product_id',
    });

    await queryInterface.addIndex('images', ['user_id'], {
      name: 'idx_images_user_id',
    });

    await queryInterface.addIndex('images', ['category'], {
      name: 'idx_images_category',
    });

    await queryInterface.addIndex('images', ['is_active'], {
      name: 'idx_images_is_active',
    });

    await queryInterface.addIndex('images', ['created_at'], {
      name: 'idx_images_created_at',
    });

    await queryInterface.addIndex('images', ['file_name'], {
      name: 'idx_images_file_name',
      unique: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove indexes first
    await queryInterface.removeIndex('images', 'idx_images_product_id');
    await queryInterface.removeIndex('images', 'idx_images_user_id');
    await queryInterface.removeIndex('images', 'idx_images_category');
    await queryInterface.removeIndex('images', 'idx_images_is_active');
    await queryInterface.removeIndex('images', 'idx_images_created_at');
    await queryInterface.removeIndex('images', 'idx_images_file_name');

    // Drop the table
    await queryInterface.dropTable('images');
  },
};
