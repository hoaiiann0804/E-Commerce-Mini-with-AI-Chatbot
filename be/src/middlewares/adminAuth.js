const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { AppError } = require('./errorHandler');

/**
 * Middleware xác thực dành riêng cho admin
 * Kiểm tra token, user tồn tại và có quyền admin/manager
 */
const adminAuthenticate = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next(
        new AppError('Cần token xác thực để truy cập admin panel', 401)
      );
    }

    const token = authHeader.split(' ')[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return next(new AppError('Người dùng không tồn tại', 401));
    }

    // Check if user has admin or manager role
    if (!['admin', 'manager'].includes(user.role)) {
      return next(new AppError('Bạn không có quyền truy cập admin panel', 403));
    }

    // Check if email is verified
    if (!user.isEmailVerified) {
      return next(
        new AppError(
          'Vui lòng xác thực email trước khi truy cập admin panel',
          401
        )
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
      return next(new AppError('Token không hợp lệ hoặc đã hết hạn', 401));
    }
    next(error);
  }
};

/**
 * Middleware phân quyền chi tiết cho admin
 * Chỉ admin mới có thể thực hiện một số hành động nhất định
 */
const requireSuperAdmin = (req, res, next) => {
  if (!req.user) {
    return next(new AppError('Vui lòng đăng nhập để tiếp tục', 401));
  }

  if (req.user.role !== 'admin') {
    return next(
      new AppError('Chỉ Super Admin mới có thể thực hiện hành động này', 403)
    );
  }

  next();
};

module.exports = {
  adminAuthenticate,
  requireSuperAdmin,
};
