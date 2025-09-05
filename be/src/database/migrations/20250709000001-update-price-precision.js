'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Cập nhật độ chính xác của trường price và compareAtPrice trong bảng products
    await queryInterface.changeColumn('products', 'price', {
      type: Sequelize.DECIMAL(12, 2),
      allowNull: false,
    });

    await queryInterface.changeColumn('products', 'compare_at_price', {
      type: Sequelize.DECIMAL(12, 2),
      allowNull: true,
    });

    // Cập nhật độ chính xác của trường price trong bảng product_variants
    await queryInterface.changeColumn('product_variants', 'price', {
      type: Sequelize.DECIMAL(12, 2),
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    // Khôi phục lại độ chính xác ban đầu
    await queryInterface.changeColumn('products', 'price', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    });

    await queryInterface.changeColumn('products', 'compare_at_price', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true,
    });

    await queryInterface.changeColumn('product_variants', 'price', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    });
  },
};
