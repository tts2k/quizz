const httpStatus = require('http-status');
const multer = require('multer');
const ApiError = require('../utils/ApiError');

const storage = multer({
  storage: multer.memoryStorage({
    fileFilter: (req, file, cb) => {
      if (file.fieldname !== "image") {
        return next(ApiError(httpStatus.BAD_REQUEST, "Invalid field name"));
      }

      if (file.fieldname === "image" && !AllowedMimeTypes.includes(file.mimetype)) {
          return next(ApiError(httpStatus.BAD_REQUEST, "Not an image"));
      }
    }
  })
})

module.exports = storage;
