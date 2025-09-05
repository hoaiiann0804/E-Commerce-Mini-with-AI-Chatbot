const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { AppError } = require('./errorHandler');

// Middleware to authenticate users
const authenticate = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next(new AppError('Vui lòng đăng nhập để tiếp tục', 401));
    }

    const token = authHeader.split(' ')[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return next(new AppError('Người dùng không tồn tại', 401));
    }

    // Check if user is active
    if (!user.isActive) {
      return next(
        new AppError(
          'Tài khoản của bạn đã bị khóa. Vui lòng liên hệ quản trị viên',
          401
        )
      );
    }

    // Check if email is verified
    if (!user.isEmailVerified) {
      return next(
        new AppError('Vui lòng xác thực email trước khi tiếp tục', 401)
      );
    }

    // Set user on request
    req.user = user;
    next();
  } catch (error) {
    if (
      error.name === 'JsonWebTokenError' ||
      error.name === 'TokenExpiredError'
    ) {
      return next(
        new AppError('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại', 401)
      );
    }
    next(error);
  }
};

// Middleware to optionally authenticate users (for cart functionality)
const optionalAuthenticate = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next(); // Continue without authentication
    }

    const token = authHeader.split(' ')[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return next(); // User not found, continue as guest
    }

    // Check if user is active - if not, return error instead of continuing as guest
    if (!user.isActive) {
      return next(
        new AppError(
          'Tài khoản của bạn đã bị khóa. Vui lòng liên hệ quản trị viên',
          401
        )
      );
    }

    // Check if email is verified
    if (!user.isEmailVerified) {
      return next(
        new AppError('Vui lòng xác thực email trước khi tiếp tục', 401)
      );
    }

    // Set user on request
    req.user = user;
    next();
  } catch (error) {
    if (
      error.name === 'JsonWebTokenError' ||
      error.name === 'TokenExpiredError'
    ) {
      // Token invalid/expired, continue as guest
      return next();
    }
    next(error);
  }
};

module.exports = {
  authenticate,
  optionalAuthenticate,
};
