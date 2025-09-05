const express = require('express');
const router = express.Router();
const ChatbotController = require('../controllers/chatbot.controller');
const { authenticate } = require('../middlewares/authenticate');

const chatbotController = new ChatbotController();

/**
 * @swagger
 * tags:
 *   name: Chatbot
 *   description: AI Chatbot for sales and customer support
 */

/**
 * @swagger
 * /api/chatbot/message:
 *   post:
 *     summary: Send message to AI chatbot
 *     tags: [Chatbot]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - message
 *             properties:
 *               message:
 *                 type: string
 *                 description: User message
 *               userId:
 *                 type: string
 *                 description: User ID (optional for personalization)
 *               sessionId:
 *                 type: string
 *                 description: Chat session ID
 *               context:
 *                 type: object
 *                 description: Additional context (current page, cart, etc.)
 *     responses:
 *       200:
 *         description: AI response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     response:
 *                       type: string
 *                       description: AI generated response
 *                     suggestions:
 *                       type: array
 *                       items:
 *                         type: string
 *                       description: Suggested follow-up questions
 *                     products:
 *                       type: array
 *                       description: Recommended products
 *                     actions:
 *                       type: array
 *                       description: Suggested actions (add to cart, view product, etc.)
 *                     sessionId:
 *                       type: string
 *                       description: Chat session ID
 */
router.post('/message', (req, res) =>
  chatbotController.handleMessage(req, res)
);

/**
 * @swagger
 * /api/chatbot/products/search:
 *   post:
 *     summary: AI-powered product search
 *     tags: [Chatbot]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - query
 *             properties:
 *               query:
 *                 type: string
 *                 description: Natural language product search query
 *               userId:
 *                 type: string
 *                 description: User ID for personalization
 *               limit:
 *                 type: integer
 *                 default: 10
 *                 description: Number of products to return
 *     responses:
 *       200:
 *         description: Product search results
 */
router.post('/products/search', (req, res) =>
  chatbotController.aiProductSearch(req, res)
);

/**
 * @swagger
 * /api/chatbot/recommendations:
 *   get:
 *     summary: Get personalized product recommendations
 *     tags: [Chatbot]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: User ID
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 5
 *         description: Number of recommendations
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [trending, personal, similar, deals]
 *           default: personal
 *         description: Type of recommendation
 *     responses:
 *       200:
 *         description: Product recommendations
 */
router.get('/recommendations', (req, res) =>
  chatbotController.getRecommendations(req, res)
);

/**
 * @swagger
 * /api/chatbot/analytics:
 *   post:
 *     summary: Track chatbot interaction analytics
 *     tags: [Chatbot]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               event:
 *                 type: string
 *                 enum: [message_sent, product_clicked, product_added_to_cart, purchase_completed]
 *               userId:
 *                 type: string
 *               sessionId:
 *                 type: string
 *               productId:
 *                 type: string
 *               value:
 *                 type: number
 *               metadata:
 *                 type: object
 *     responses:
 *       200:
 *         description: Analytics tracked successfully
 */
router.post('/analytics', (req, res) =>
  chatbotController.trackAnalytics(req, res)
);

/**
 * @swagger
 * /api/chatbot/cart/add:
 *   post:
 *     summary: Add product to cart via chatbot
 *     tags: [Chatbot]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *             properties:
 *               productId:
 *                 type: string
 *               variantId:
 *                 type: string
 *               quantity:
 *                 type: integer
 *                 default: 1
 *               sessionId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Product added to cart
 */
router.post('/cart/add', authenticate, (req, res) =>
  chatbotController.addToCart(req, res)
);

// Test endpoint
router.get('/test', (req, res) => {
  res.json({
    status: 'success',
    message: 'Chatbot API is working!',
    timestamp: new Date().toISOString(),
  });
});

// Simple test message endpoint
router.post('/test-message', async (req, res) => {
  try {
    const { message } = req.body;

    // Simple response without complex logic
    res.json({
      status: 'success',
      data: {
        response: `Bạn vừa nói: "${message}". Tôi đã nhận được tin nhắn! 😊`,
        suggestions: ['Tìm sản phẩm', 'Xem khuyến mãi', 'Liên hệ hỗ trợ'],
      },
    });
  } catch (error) {
    console.error('Test message error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Test failed',
    });
  }
});

// Simple message using controller
router.post('/simple-message', (req, res) =>
  chatbotController.handleSimpleMessage(req, res)
);

module.exports = router;
