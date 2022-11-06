const httpStatus = require('http-status');
const multer = require('multer');
const { v4: uuid4 } = require('uuid');
const path = require('path');
const ApiError = require('../utils/ApiError');
const { allowedMimeTypes } = require('../constants');

const storage = multer({
  storage: multer.diskStorage({
    fileFilter: (req, file, cb) => {
      if (file.fieldname !== "image" || file.fieldname !== "json") {
        return next(ApiError(httpStatus.BAD_REQUEST, "Invalid field name"));
      }

      if (file.fieldname === "image" && !allowedMimeTypes.includes(file.mimetype)) {
          return next(ApiError(httpStatus.BAD_REQUEST, "Not an image"));
      }
    },
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '../public/'));
    },
    filename: (req, file, cb) => {
      const fnPrefix = uuid4();
      cb(null, `${fnPrefix}-${file.originalname}`);
    }
  })
})

module.exports = storage;
