const { AppError } = require('./errorHandler');

// Middleware to authorize users based on role
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new AppError('Vui lòng đăng nhập để tiếp tục', 401));
    }

    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('Bạn không có quyền thực hiện hành động này', 403)
      );
    }

    next();
  };
};

module.exports = {
  authorize,
};
