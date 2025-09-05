const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review.controller');
const { validateRequest } = require('../middlewares/validateRequest');
const {
  reviewSchema,
  reviewHelpfulSchema,
} = require('../validators/review.validator');
const { authenticate } = require('../middlewares/authenticate');
const { authorize } = require('../middlewares/authorize');

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: Product reviews management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Review ID
 *         productId:
 *           type: string
 *           description: Product ID
 *         userId:
 *           type: string
 *           description: User ID
 *         userName:
 *           type: string
 *           description: User's name
 *         userAvatar:
 *           type: string
 *           description: User's avatar URL
 *         rating:
 *           type: number
 *           description: Rating (1-5)
 *         title:
 *           type: string
 *           description: Review title
 *         comment:
 *           type: string
 *           description: Review comment
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           description: Review images
 *         isVerifiedPurchase:
 *           type: boolean
 *           description: Whether the review is from a verified purchase
 *         likes:
 *           type: number
 *           description: Number of likes
 *         dislikes:
 *           type: number
 *           description: Number of dislikes
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Creation date
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last update date
 */

// Public routes

/**
 * @swagger
 * /api/reviews/product/{productId}:
 *   get:
 *     summary: Get reviews for a product
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *       - in: query
 *         name: rating
 *         schema:
 *           type: number
 *         description: Filter by rating
 *       - in: query
 *         name: verified
 *         schema:
 *           type: boolean
 *         description: Filter by verified purchase status
 *       - in: query
 *         name: withImages
 *         schema:
 *           type: boolean
 *         description: Filter reviews with images
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [newest, oldest, highest_rating, lowest_rating, most_helpful]
 *         description: Sort order
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of reviews
 *       404:
 *         description: Product not found
 */
router.get('/product/:productId', reviewController.getProductReviews);

// User routes (authenticated)

/**
 * @swagger
 * /api/reviews/user:
 *   get:
 *     summary: Get reviews by current user
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's reviews
 *       401:
 *         description: Not authenticated
 */
router.use('/user', authenticate);
router.get('/user', reviewController.getUserReviews);

/**
 * @swagger
 * /api/reviews:
 *   post:
 *     summary: Create a new review
 *     tags: [Reviews]
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
 *               - rating
 *               - title
 *               - comment
 *             properties:
 *               productId:
 *                 type: string
 *               rating:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 5
 *               title:
 *                 type: string
 *               comment:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Review created successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Not authenticated
 *       404:
 *         description: Product not found
 */
router.post(
  '/',
  authenticate,
  validateRequest(reviewSchema),
  reviewController.createReview
);

/**
 * @swagger
 * /api/reviews/{id}:
 *   put:
 *     summary: Update a review
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Review ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 5
 *               title:
 *                 type: string
 *               comment:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Review updated successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Not authenticated
 *       403:
 *         description: Not authorized to update this review
 *       404:
 *         description: Review not found
 */
router.put(
  '/:id',
  authenticate,
  validateRequest(reviewSchema),
  reviewController.updateReview
);

/**
 * @swagger
 * /api/reviews/{id}:
 *   delete:
 *     summary: Delete a review
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Review ID
 *     responses:
 *       200:
 *         description: Review deleted successfully
 *       401:
 *         description: Not authenticated
 *       403:
 *         description: Not authorized to delete this review
 *       404:
 *         description: Review not found
 */
router.delete('/:id', authenticate, reviewController.deleteReview);

/**
 * @swagger
 * /api/reviews/{id}/helpful:
 *   put:
 *     summary: Mark review as helpful or not
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Review ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - helpful
 *             properties:
 *               helpful:
 *                 type: boolean
 *                 description: true for like, false for dislike
 *     responses:
 *       200:
 *         description: Review helpfulness updated
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Not authenticated
 *       404:
 *         description: Review not found
 */
router.put(
  '/:id/helpful',
  authenticate,
  validateRequest(reviewHelpfulSchema),
  reviewController.markReviewHelpful
);

// Admin routes

/**
 * @swagger
 * /api/reviews/admin/all:
 *   get:
 *     summary: Get all reviews (admin only)
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of all reviews
 *       401:
 *         description: Not authenticated
 *       403:
 *         description: Not authorized
 */
router.get(
  '/admin/all',
  authenticate,
  authorize('admin'),
  reviewController.getAllReviews
);

/**
 * @swagger
 * /api/reviews/admin/{id}/verify:
 *   patch:
 *     summary: Verify a review (admin only)
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Review ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - isVerified
 *             properties:
 *               isVerified:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Review verification status updated
 *       401:
 *         description: Not authenticated
 *       403:
 *         description: Not authorized
 *       404:
 *         description: Review not found
 */
router.patch(
  '/admin/:id/verify',
  authenticate,
  authorize('admin'),
  reviewController.verifyReview
);

module.exports = router;
