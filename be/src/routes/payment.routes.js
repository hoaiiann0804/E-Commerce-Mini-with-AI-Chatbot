const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment.controller');
const { authenticate } = require('../middlewares/authenticate');
const { authorize } = require('../middlewares/authorize');

// Webhook route (no authentication needed)
router.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  paymentController.handleWebhook
);

// Authenticated routes
router.use(authenticate);

// Create payment intent
router.post('/create-payment-intent', paymentController.createPaymentIntent);

// Confirm payment
router.post('/confirm-payment', paymentController.confirmPayment);

// Customer management
router.post('/create-customer', paymentController.createCustomer);
router.get('/payment-methods', paymentController.getPaymentMethods);
router.post('/create-setup-intent', paymentController.createSetupIntent);

// Admin routes
router.post('/refund', authorize('admin'), paymentController.createRefund);

module.exports = router;
