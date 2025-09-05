const {
  Order,
  OrderItem,
  Cart,
  CartItem,
  Product,
  ProductVariant,
  sequelize,
} = require('../models');
const { AppError } = require('../middlewares/errorHandler');
const emailService = require('../services/email/emailService');

// Create order from cart
const createOrder = async (req, res, next) => {
  const transaction = await sequelize.transaction();

  try {
    const userId = req.user.id;
    const {
      shippingFirstName,
      shippingLastName,
      shippingCompany,
      shippingAddress1,
      shippingAddress2,
      shippingCity,
      shippingState,
      shippingZip,
      shippingCountry,
      shippingPhone,
      billingFirstName,
      billingLastName,
      billingCompany,
      billingAddress1,
      billingAddress2,
      billingCity,
      billingState,
      billingZip,
      billingCountry,
      billingPhone,
      paymentMethod,
      notes,
    } = req.body;

    // Get active cart
    const cart = await Cart.findOne({
      where: {
        userId,
        status: 'active',
      },
      include: [
        {
          association: 'items',
          include: [
            {
              model: Product,
              attributes: [
                'id',
                'name',
                'slug',
                'price',
                'thumbnail',
                'inStock',
                'stockQuantity',
                'sku',
              ],
            },
            {
              model: ProductVariant,
              attributes: ['id', 'name', 'price', 'stockQuantity', 'sku'],
            },
          ],
        },
      ],
    });

    if (!cart || cart.items.length === 0) {
      throw new AppError('Giỏ hàng trống', 400);
    }

    // Check stock and calculate totals
    let subtotal = 0;
    const tax = 0; // Calculate tax if needed
    const shippingCost = 0; // Calculate shipping if needed
    const discount = 0; // Apply discount if needed

    for (const item of cart.items) {
      const product = item.Product;
      const variant = item.ProductVariant;

      // Check if product is in stock
      if (!product.inStock) {
        throw new AppError(`Sản phẩm "${product.name}" đã hết hàng`, 400);
      }

      // Check stock quantity
      if (variant) {
        if (variant.stockQuantity < item.quantity) {
          throw new AppError(
            `Biến thể "${variant.name}" của sản phẩm "${product.name}" chỉ còn ${variant.stockQuantity} sản phẩm`,
            400
          );
        }
      } else if (product.stockQuantity < item.quantity) {
        throw new AppError(
          `Sản phẩm "${product.name}" chỉ còn ${product.stockQuantity} sản phẩm`,
          400
        );
      }

      // Calculate item price
      const price = variant ? variant.price : product.price;
      subtotal += price * item.quantity;
    }

    // Calculate total
    const total = subtotal + tax + shippingCost - discount;

    // Generate order number
    const date = new Date();
    const year = date.getFullYear().toString().substr(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const count = await Order.count();
    const orderNumber = `ORD-${year}${month}-${(count + 1).toString().padStart(5, '0')}`;

    // Create order
    const order = await Order.create(
      {
        number: orderNumber,
        userId,
        shippingFirstName,
        shippingLastName,
        shippingCompany,
        shippingAddress1,
        shippingAddress2,
        shippingCity,
        shippingState,
        shippingZip,
        shippingCountry,
        shippingPhone,
        billingFirstName,
        billingLastName,
        billingCompany,
        billingAddress1,
        billingAddress2,
        billingCity,
        billingState,
        billingZip,
        billingCountry,
        billingPhone,
        paymentMethod,
        paymentStatus: 'pending',
        subtotal,
        tax,
        shippingCost,
        discount,
        total,
        notes,
      },
      { transaction }
    );

    // Create order items
    const orderItems = [];
    for (const item of cart.items) {
      const product = item.Product;
      const variant = item.ProductVariant;
      const price = variant ? variant.price : product.price;
      const subtotal = price * item.quantity;

      const orderItem = await OrderItem.create(
        {
          orderId: order.id,
          productId: product.id,
          variantId: variant ? variant.id : null,
          name: product.name,
          sku: variant ? variant.sku : product.sku,
          price,
          quantity: item.quantity,
          subtotal,
          image: product.thumbnail,
          attributes: variant ? { variant: variant.name } : {},
        },
        { transaction }
      );

      orderItems.push(orderItem);

      // Update stock
      if (variant) {
        await variant.update(
          {
            stockQuantity: variant.stockQuantity - item.quantity,
          },
          { transaction }
        );
      } else {
        await product.update(
          {
            stockQuantity: product.stockQuantity - item.quantity,
          },
          { transaction }
        );
      }
    }

    // Mark cart as converted
    await cart.update(
      {
        status: 'converted',
      },
      { transaction }
    );

    // Clear cart items
    await CartItem.destroy({
      where: { cartId: cart.id },
      transaction,
    });

    await transaction.commit();

    // Send order confirmation email
    await emailService.sendOrderConfirmationEmail(req.user.email, {
      orderNumber: order.number,
      orderDate: order.createdAt,
      total: order.total,
      items: orderItems.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        subtotal: item.subtotal,
      })),
      shippingAddress: {
        name: `${order.shippingFirstName} ${order.shippingLastName}`,
        address1: order.shippingAddress1,
        address2: order.shippingAddress2,
        city: order.shippingCity,
        state: order.shippingState,
        zip: order.shippingZip,
        country: order.shippingCountry,
      },
    });

    res.status(201).json({
      status: 'success',
      data: {
        order: {
          id: order.id,
          number: order.number,
          status: order.status,
          total: order.total,
          createdAt: order.createdAt,
        },
      },
    });
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
};

// Get user orders
const getUserOrders = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { page = 1, limit = 10 } = req.query;

    const { count, rows: orders } = await Order.findAndCountAll({
      where: { userId },
      include: [
        {
          association: 'items',
          include: [
            {
              model: Product,
              attributes: ['id', 'name', 'images', 'price'],
            },
          ],
        },
      ],
      limit: parseInt(limit),
      offset: (parseInt(page) - 1) * parseInt(limit),
      order: [['createdAt', 'DESC']],
    });

    res.status(200).json({
      status: 'success',
      data: {
        total: count,
        pages: Math.ceil(count / limit),
        currentPage: parseInt(page),
        orders,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get order by ID
const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const order = await Order.findOne({
      where: { id, userId },
      include: [
        {
          association: 'items',
        },
      ],
    });

    if (!order) {
      throw new AppError('Không tìm thấy đơn hàng', 404);
    }

    res.status(200).json({
      status: 'success',
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

// Get order by number
const getOrderByNumber = async (req, res, next) => {
  try {
    const { number } = req.params;
    const userId = req.user.id;

    const order = await Order.findOne({
      where: { number, userId },
      include: [
        {
          association: 'items',
        },
      ],
    });

    if (!order) {
      throw new AppError('Không tìm thấy đơn hàng', 404);
    }

    res.status(200).json({
      status: 'success',
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

// Cancel order
const cancelOrder = async (req, res, next) => {
  const transaction = await sequelize.transaction();

  try {
    const { id } = req.params;
    const userId = req.user.id;

    const order = await Order.findOne({
      where: { id, userId },
      include: [
        {
          association: 'items',
          include: [
            {
              model: Product,
            },
            {
              model: ProductVariant,
            },
          ],
        },
      ],
    });

    if (!order) {
      throw new AppError('Không tìm thấy đơn hàng', 404);
    }

    // Check if order can be cancelled
    if (order.status !== 'pending' && order.status !== 'processing') {
      throw new AppError('Không thể hủy đơn hàng này', 400);
    }

    // Update order status
    await order.update(
      {
        status: 'cancelled',
      },
      { transaction }
    );

    // Restore stock
    for (const item of order.items) {
      if (item.variantId) {
        const variant = item.ProductVariant;
        await variant.update(
          {
            stockQuantity: variant.stockQuantity + item.quantity,
          },
          { transaction }
        );
      } else {
        const product = item.Product;
        await product.update(
          {
            stockQuantity: product.stockQuantity + item.quantity,
          },
          { transaction }
        );
      }
    }

    await transaction.commit();

    // Send cancellation email
    await emailService.sendOrderCancellationEmail(req.user.email, {
      orderNumber: order.number,
      orderDate: order.createdAt,
    });

    res.status(200).json({
      status: 'success',
      message: 'Đơn hàng đã được hủy',
      data: {
        id: order.id,
        number: order.number,
        status: 'cancelled',
      },
    });
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
};

// Admin: Get all orders
const getAllOrders = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, status } = req.query;

    const whereConditions = {};
    if (status) {
      whereConditions.status = status;
    }

    const { count, rows: orders } = await Order.findAndCountAll({
      where: whereConditions,
      limit: parseInt(limit),
      offset: (parseInt(page) - 1) * parseInt(limit),
      order: [['createdAt', 'DESC']],
      include: [
        {
          association: 'user',
          attributes: ['id', 'firstName', 'lastName', 'email'],
        },
      ],
    });

    res.status(200).json({
      status: 'success',
      data: {
        total: count,
        pages: Math.ceil(count / limit),
        currentPage: parseInt(page),
        orders,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Update order status
const updateOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findByPk(id, {
      include: [
        {
          association: 'user',
          attributes: ['id', 'firstName', 'lastName', 'email'],
        },
      ],
    });

    if (!order) {
      throw new AppError('Không tìm thấy đơn hàng', 404);
    }

    // Update order status
    await order.update({ status });

    // Send status update email
    await emailService.sendOrderStatusUpdateEmail(order.user.email, {
      orderNumber: order.number,
      orderDate: order.createdAt,
      status,
    });

    res.status(200).json({
      status: 'success',
      message: 'Cập nhật trạng thái đơn hàng thành công',
      data: {
        id: order.id,
        number: order.number,
        status: order.status,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Thanh toán lại đơn hàng
 */
const repayOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Tìm đơn hàng
    const order = await Order.findOne({
      where: { id, userId },
    });

    if (!order) {
      throw new AppError('Không tìm thấy đơn hàng', 404);
    }

    // Kiểm tra trạng thái đơn hàng
    if (
      order.status !== 'pending' &&
      order.status !== 'cancelled' &&
      order.paymentStatus !== 'failed'
    ) {
      throw new AppError('Đơn hàng này không thể thanh toán lại', 400);
    }

    // Cập nhật trạng thái đơn hàng
    await order.update({
      status: 'pending',
      paymentStatus: 'pending',
    });

    // Lấy origin từ request header để tạo URL thanh toán động
    const origin = req.get('origin') || 'http://localhost:5175';

    // Tạo URL thanh toán giả lập
    // Trong thực tế, bạn sẽ tích hợp với cổng thanh toán thực tế ở đây
    const paymentUrl = `${origin}/checkout?repayOrder=${order.id}&amount=${order.total}`;

    res.status(200).json({
      status: 'success',
      message: 'Đơn hàng đã được cập nhật để thanh toán lại',
      data: {
        id: order.id,
        number: order.number,
        status: order.status,
        paymentStatus: order.paymentStatus,
        total: order.total,
        paymentUrl: paymentUrl, // Thêm URL thanh toán vào response
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  getUserOrders,
  getOrderById,
  getOrderByNumber,
  cancelOrder,
  getAllOrders,
  updateOrderStatus,
  repayOrder,
};
