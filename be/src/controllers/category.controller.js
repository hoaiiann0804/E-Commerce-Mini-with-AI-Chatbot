const { Category, Product, sequelize } = require('../models');
const { AppError } = require('../middlewares/errorHandler');
const { Op } = require('sequelize');

// Get all categories
const getAllCategories = async (req, res, next) => {
  try {
    // Lấy danh sách danh mục
    const categories = await Category.findAll({
      order: [
        ['sortOrder', 'ASC'],
        ['name', 'ASC'],
      ],
    });

    // Lấy số lượng sản phẩm cho mỗi danh mục
    const categoryCounts = await sequelize.query(
      `
      SELECT 
        category_id, 
        COUNT(DISTINCT product_id) as product_count 
      FROM 
        product_categories 
      GROUP BY 
        category_id
    `,
      { type: sequelize.QueryTypes.SELECT }
    );

    // Tạo map từ category_id đến product_count
    const countMap = {};
    categoryCounts.forEach((item) => {
      countMap[item.category_id] = parseInt(item.product_count);
    });

    // Thêm productCount vào mỗi danh mục
    const categoriesWithCount = categories.map((category) => {
      const categoryData = category.toJSON();
      categoryData.productCount = countMap[category.id] || 0;
      return categoryData;
    });

    res.status(200).json({
      status: 'success',
      data: categoriesWithCount,
    });
  } catch (error) {
    next(error);
  }
};

// Get category tree
const getCategoryTree = async (req, res, next) => {
  try {
    // Get all categories
    const allCategories = await Category.findAll({
      where: { isActive: true },
      order: [
        ['sortOrder', 'ASC'],
        ['name', 'ASC'],
      ],
    });

    // Build tree structure
    const rootCategories = [];
    const categoryMap = {};

    // Create map of categories
    allCategories.forEach((category) => {
      categoryMap[category.id] = {
        ...category.toJSON(),
        children: [],
      };
    });

    // Build tree
    allCategories.forEach((category) => {
      if (category.parentId) {
        if (categoryMap[category.parentId]) {
          categoryMap[category.parentId].children.push(
            categoryMap[category.id]
          );
        }
      } else {
        rootCategories.push(categoryMap[category.id]);
      }
    });

    res.status(200).json({
      status: 'success',
      data: rootCategories,
    });
  } catch (error) {
    next(error);
  }
};

// Get category by ID
const getCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const category = await Category.findByPk(id, {
      include: [
        {
          association: 'parent',
          attributes: ['id', 'name', 'slug'],
        },
        {
          association: 'children',
          attributes: ['id', 'name', 'slug', 'image'],
          where: { isActive: true },
          required: false,
        },
      ],
    });

    if (!category) {
      throw new AppError('Không tìm thấy danh mục', 404);
    }

    res.status(200).json({
      status: 'success',
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

// Get category by slug
const getCategoryBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const category = await Category.findOne({
      where: { slug },
      include: [
        {
          association: 'parent',
          attributes: ['id', 'name', 'slug'],
        },
        {
          association: 'children',
          attributes: ['id', 'name', 'slug', 'image'],
          where: { isActive: true },
          required: false,
        },
      ],
    });

    if (!category) {
      throw new AppError('Không tìm thấy danh mục', 404);
    }

    res.status(200).json({
      status: 'success',
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

// Create category
const createCategory = async (req, res, next) => {
  try {
    const { name, description, image, parentId, isActive, sortOrder } =
      req.body;

    // Check if parent category exists
    if (parentId) {
      const parentCategory = await Category.findByPk(parentId);
      if (!parentCategory) {
        throw new AppError('Danh mục cha không tồn tại', 400);
      }
    }

    // Create category
    const category = await Category.create({
      name,
      description,
      image,
      parentId,
      isActive,
      sortOrder,
      level: parentId ? 2 : 1, // Simple level calculation
    });

    res.status(201).json({
      status: 'success',
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

// Update category
const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, image, parentId, isActive, sortOrder } =
      req.body;

    // Find category
    const category = await Category.findByPk(id);
    if (!category) {
      throw new AppError('Không tìm thấy danh mục', 404);
    }

    // Check if parent category exists
    if (parentId && parentId !== category.parentId) {
      // Check if parent is not the category itself
      if (parentId === id) {
        throw new AppError(
          'Danh mục không thể là danh mục cha của chính nó',
          400
        );
      }

      const parentCategory = await Category.findByPk(parentId);
      if (!parentCategory) {
        throw new AppError('Danh mục cha không tồn tại', 400);
      }

      // Check if parent is not a child of this category (prevent circular reference)
      const childCategories = await Category.findAll({
        where: { parentId: id },
      });

      const childIds = childCategories.map((child) => child.id);
      if (childIds.includes(parentId)) {
        throw new AppError('Không thể chọn danh mục con làm danh mục cha', 400);
      }
    }

    // Update category
    await category.update({
      name: name !== undefined ? name : category.name,
      description:
        description !== undefined ? description : category.description,
      image: image !== undefined ? image : category.image,
      parentId: parentId !== undefined ? parentId : category.parentId,
      isActive: isActive !== undefined ? isActive : category.isActive,
      sortOrder: sortOrder !== undefined ? sortOrder : category.sortOrder,
      level: parentId ? 2 : 1, // Simple level calculation
    });

    res.status(200).json({
      status: 'success',
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

// Delete category
const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Find category
    const category = await Category.findByPk(id);
    if (!category) {
      throw new AppError('Không tìm thấy danh mục', 404);
    }

    // Check if category has children
    const childCategories = await Category.findAll({
      where: { parentId: id },
    });

    if (childCategories.length > 0) {
      throw new AppError('Không thể xóa danh mục có danh mục con', 400);
    }

    // Check if category has products
    const productCount = await Product.count({
      include: [
        {
          association: 'categories',
          where: { id },
          required: true,
        },
      ],
    });

    if (productCount > 0) {
      throw new AppError('Không thể xóa danh mục có sản phẩm', 400);
    }

    // Delete category
    await category.destroy();

    res.status(200).json({
      status: 'success',
      message: 'Xóa danh mục thành công',
    });
  } catch (error) {
    next(error);
  }
};

// Get products by category
const getProductsByCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      page = 1,
      limit = 10,
      sort = 'createdAt',
      order = 'DESC',
    } = req.query;

    // Find category
    const category = await Category.findByPk(id);
    if (!category) {
      throw new AppError('Không tìm thấy danh mục', 404);
    }

    // Get all child category IDs
    const childCategories = await Category.findAll({
      where: { parentId: id },
    });

    const categoryIds = [id, ...childCategories.map((cat) => cat.id)];

    // Get products
    const { count, rows: products } = await Product.findAndCountAll({
      include: [
        {
          association: 'categories',
          where: { id: { [Op.in]: categoryIds } },
          through: { attributes: [] },
        },
      ],
      distinct: true,
      limit: parseInt(limit),
      offset: (parseInt(page) - 1) * parseInt(limit),
      order: [[sort, order]],
    });

    res.status(200).json({
      status: 'success',
      data: {
        total: count,
        pages: Math.ceil(count / limit),
        currentPage: parseInt(page),
        products,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get featured categories
const getFeaturedCategories = async (req, res, next) => {
  try {
    // Get featured categories (those with featured products)
    const categories = await Category.findAll({
      include: [
        {
          association: 'products',
          where: { featured: true },
          through: { attributes: [] },
          required: true,
        },
      ],
      where: { isActive: true },
      order: [
        ['sortOrder', 'ASC'],
        ['name', 'ASC'],
      ],
    });

    // If no featured categories found, return top-level categories
    if (categories.length === 0) {
      const topCategories = await Category.findAll({
        where: {
          isActive: true,
          parentId: null,
        },
        limit: 5,
        order: [
          ['sortOrder', 'ASC'],
          ['name', 'ASC'],
        ],
      });

      return res.status(200).json({
        status: 'success',
        data: topCategories,
      });
    }

    res.status(200).json({
      status: 'success',
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCategories,
  getCategoryTree,
  getCategoryById,
  getCategoryBySlug,
  createCategory,
  updateCategory,
  deleteCategory,
  getProductsByCategory,
  getFeaturedCategories,
};
