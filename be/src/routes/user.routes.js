const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { validateRequest } = require('../middlewares/validateRequest');
const {
  updateUserSchema,
  changePasswordSchema,
} = require('../validators/user.validator');
const { addressSchema } = require('../validators/address.validator');
const { authenticate } = require('../middlewares/authenticate');

// All routes require authentication
router.use(authenticate);

// Profile routes
router.put(
  '/profile',
  validateRequest(updateUserSchema),
  userController.updateProfile
);
router.post(
  '/change-password',
  validateRequest(changePasswordSchema),
  userController.changePassword
);

// Address routes
router.get('/addresses', userController.getAddresses);
router.post(
  '/addresses',
  validateRequest(addressSchema),
  userController.addAddress
);
router.put(
  '/addresses/:id',
  validateRequest(addressSchema),
  userController.updateAddress
);
router.delete('/addresses/:id', userController.deleteAddress);
router.patch('/addresses/:id/default', userController.setDefaultAddress);

module.exports = router;
