const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { AppError } = require('../middlewares/errorHandler');

// Create upload directories if they don't exist
const uploadDirs = {
  reviews: path.join(__dirname, '../../uploads/reviews'),
  products: path.join(__dirname, '../../uploads/products'),
  users: path.join(__dirname, '../../uploads/users'),
};

Object.values(uploadDirs).forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadType = req.params.type || 'general';
    const uploadPath = uploadDirs[uploadType] || uploadDirs.products;
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = uuidv4();
    const ext = path.extname(file.originalname);
    cb(null, `${uniqueSuffix}${ext}`);
  },
});

// File filter for images
const fileFilter = (req, file, cb) => {
  const allowedMimes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/webp',
  ];

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new AppError('Chỉ chấp nhận file ảnh (JPEG, PNG, GIF, WebP)', 400),
      false
    );
  }
};

// Multer configuration
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
    files: 10, // Maximum 10 files
  },
});

// Upload single file
const uploadSingle = async (req, res, next) => {
  try {
    const uploadType = req.params.type || 'general';

    // Use multer middleware
    const uploadMiddleware = upload.single('file');

    uploadMiddleware(req, res, (err) => {
      if (err) {
        if (err instanceof multer.MulterError) {
          if (err.code === 'LIMIT_FILE_SIZE') {
            return next(
              new AppError('File quá lớn. Kích thước tối đa 5MB', 400)
            );
          }
          return next(new AppError(`Lỗi upload: ${err.message}`, 400));
        }
        return next(err);
      }

      if (!req.file) {
        return next(new AppError('Không có file được upload', 400));
      }

      // Generate URL for the uploaded file
      const fileUrl = `/uploads/${uploadType}/${req.file.filename}`;

      res.status(200).json({
        status: 'success',
        message: 'Upload file thành công',
        data: {
          filename: req.file.filename,
          originalName: req.file.originalname,
          url: fileUrl,
          size: req.file.size,
          type: uploadType,
        },
      });
    });
  } catch (error) {
    next(error);
  }
};

// Upload multiple files
const uploadMultiple = async (req, res, next) => {
  try {
    const uploadType = req.params.type || 'general';
    const maxFiles = uploadType === 'reviews' ? 5 : 10;

    // Use multer middleware for multiple files
    const uploadMiddleware = upload.array('files', maxFiles);

    uploadMiddleware(req, res, (err) => {
      if (err) {
        if (err instanceof multer.MulterError) {
          if (err.code === 'LIMIT_FILE_SIZE') {
            return next(
              new AppError('File quá lớn. Kích thước tối đa 5MB', 400)
            );
          }
          if (err.code === 'LIMIT_FILE_COUNT') {
            return next(
              new AppError(`Số lượng file tối đa là ${maxFiles}`, 400)
            );
          }
          return next(new AppError(`Lỗi upload: ${err.message}`, 400));
        }
        return next(err);
      }

      if (!req.files || req.files.length === 0) {
        return next(new AppError('Không có file được upload', 400));
      }

      // Generate URLs for uploaded files
      const files = req.files.map((file) => ({
        filename: file.filename,
        originalName: file.originalname,
        url: `/uploads/${uploadType}/${file.filename}`,
        size: file.size,
      }));

      res.status(200).json({
        status: 'success',
        message: `Upload ${files.length} file thành công`,
        data: {
          files,
          type: uploadType,
          count: files.length,
        },
      });
    });
  } catch (error) {
    next(error);
  }
};

// Delete uploaded file
const deleteFile = async (req, res, next) => {
  try {
    const { type, filename } = req.params;

    if (!uploadDirs[type]) {
      throw new AppError('Loại file không hợp lệ', 400);
    }

    const filePath = path.join(uploadDirs[type], filename);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      throw new AppError('File không tồn tại', 404);
    }

    // Delete file
    fs.unlinkSync(filePath);

    res.status(200).json({
      status: 'success',
      message: 'Xóa file thành công',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadSingle,
  uploadMultiple,
  deleteFile,
  upload, // Export multer instance for use in other controllers
};
