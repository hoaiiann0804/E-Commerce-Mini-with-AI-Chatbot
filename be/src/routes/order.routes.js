const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const { validateRequest } = require('../middlewares/validateRequest');
const {
  createOrderSchema,
  updateOrderStatusSchema,
} = require('../validators/order.validator');
const { authenticate } = require('../middlewares/authenticate');
const { authorize } = require('../middlewares/authorize');

// User routes (authenticated)
router.use(authenticate);
router.post(
  '/',
  validateRequest(createOrderSchema),
  orderController.createOrder
);
router.get('/', orderController.getUserOrders);
router.get('/number/:number', orderController.getOrderByNumber);
router.get('/:id', orderController.getOrderById);
router.post('/:id/cancel', orderController.cancelOrder);
router.post('/:id/repay', orderController.repayOrder);

// Admin routes
router.get('/admin/all', authorize('admin'), orderController.getAllOrders);

router.patch(
  '/admin/:id/status',
  authorize('admin'),
  validateRequest(updateOrderStatusSchema),
  orderController.updateOrderStatus
);

module.exports = router;
