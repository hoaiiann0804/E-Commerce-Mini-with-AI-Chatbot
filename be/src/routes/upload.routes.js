const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/upload.controller');
const { authenticate } = require('../middlewares/authenticate');

/**
 * @swagger
 * tags:
 *   name: Upload
 *   description: File upload management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UploadedFile:
 *       type: object
 *       properties:
 *         filename:
 *           type: string
 *           description: Generated filename
 *         originalName:
 *           type: string
 *           description: Original filename
 *         url:
 *           type: string
 *           description: File URL
 *         size:
 *           type: number
 *           description: File size in bytes
 */

/**
 * @swagger
 * /api/upload/{type}/single:
 *   post:
 *     summary: Upload a single file
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *           enum: [reviews, products, users]
 *         description: Upload type
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Image file to upload
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/UploadedFile'
 *       400:
 *         description: Invalid file or upload error
 *       401:
 *         description: Not authenticated
 */
router.post('/:type/single', authenticate, uploadController.uploadSingle);

/**
 * @swagger
 * /api/upload/{type}/multiple:
 *   post:
 *     summary: Upload multiple files
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *           enum: [reviews, products, users]
 *         description: Upload type
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Image files to upload (max 5 for reviews, 10 for others)
 *     responses:
 *       200:
 *         description: Files uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     files:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/UploadedFile'
 *                     type:
 *                       type: string
 *                     count:
 *                       type: number
 *       400:
 *         description: Invalid files or upload error
 *       401:
 *         description: Not authenticated
 */
router.post('/:type/multiple', authenticate, uploadController.uploadMultiple);

/**
 * @swagger
 * /api/upload/{type}/{filename}:
 *   delete:
 *     summary: Delete an uploaded file
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *           enum: [reviews, products, users]
 *         description: Upload type
 *       - in: path
 *         name: filename
 *         required: true
 *         schema:
 *           type: string
 *         description: Filename to delete
 *     responses:
 *       200:
 *         description: File deleted successfully
 *       404:
 *         description: File not found
 *       401:
 *         description: Not authenticated
 */
router.delete('/:type/:filename', authenticate, uploadController.deleteFile);

module.exports = router;
