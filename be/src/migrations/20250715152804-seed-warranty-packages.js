'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const warrantyPackages = [
      {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Bảo hành cơ bản',
        description: 'Bảo hành miễn phí 12 tháng cho lỗi nhà sản xuất',
        duration_months: 12,
        price: 0,
        terms: JSON.stringify({
          coverage: ['Lỗi nhà sản xuất', 'Hỏng hóc do chất lượng'],
          exclusions: ['Hỏng do người dùng', 'Rơi vỡ', 'Vào nước'],
        }),
        coverage: ['Lỗi nhà sản xuất', 'Hỏng hóc do chất lượng'],
        is_active: true,
        sort_order: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: '123e4567-e89b-12d3-a456-426614174001',
        name: 'Bảo hành mở rộng 24 tháng',
        description: 'Bảo hành 24 tháng với hỗ trợ thay thế nhanh',
        duration_months: 24,
        price: 500000,
        terms: JSON.stringify({
          coverage: [
            'Lỗi nhà sản xuất',
            'Hỏng hóc do chất lượng',
            'Hỗ trợ thay thế',
          ],
          exclusions: ['Hỏng do người dùng', 'Rơi vỡ', 'Vào nước'],
        }),
        coverage: [
          'Lỗi nhà sản xuất',
          'Hỏng hóc do chất lượng',
          'Hỗ trợ thay thế',
        ],
        is_active: true,
        sort_order: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: '123e4567-e89b-12d3-a456-426614174002',
        name: 'Bảo hành toàn diện',
        description: 'Bảo hành 36 tháng bao gồm cả tai nạn và rơi vỡ',
        duration_months: 36,
        price: 1200000,
        terms: JSON.stringify({
          coverage: [
            'Lỗi nhà sản xuất',
            'Hỏng hóc do chất lượng',
            'Tai nạn',
            'Rơi vỡ',
          ],
          exclusions: ['Mất cắp', 'Hỏng do thiên tai'],
        }),
        coverage: [
          'Lỗi nhà sản xuất',
          'Hỏng hóc do chất lượng',
          'Tai nạn',
          'Rơi vỡ',
        ],
        is_active: true,
        sort_order: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    await queryInterface.bulkInsert('warranty_packages', warrantyPackages);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('warranty_packages', null, {});
  },
};
