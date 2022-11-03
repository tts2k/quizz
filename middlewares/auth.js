const passport = require('passport');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

const verifyAdmin = (req, resolve, reject, requiresAdmin) => async (err, user, info) => {
  if (err || info || !user) {
    return reject(new ApiError(httpStatus.UNAUTHORIZED, "Access denied. Please try to log in again"));
  }
  req.user = user;
    
  if (requiresAdmin) {
    if (!user.isAdmin) {
      return reject(new ApiError(httpStatus.FORBIDDEN, "Forbidden"));
    }
  }

  resolve();
};

const auth = (requiresAdmin = false) => 
  async (req, res, next) => {
    return new Promise((resolve, reject) => {
      passport.authenticate(
        "jwt",
        { session: false },
        verifyAdmin(req, resolve, reject, requiresAdmin))(req, res, next)
    })
      .then(() => next())
      .catch((err) => next(err));
  };

module.exports = auth;
