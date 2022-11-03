const allowedMimeTypes = [
    "image/png", ".image/jpeg", "image/jpeg", "image/jpg", "image/webp"
];

const tokenTypes = {
  ACCESS: 'access',
  REFRESH: 'refresh',
  RESET_PASSWORD: 'resetPassword',
  VERIFY_EMAIL: 'VERIFY_EMAIL'
};

const itemsPerPage = 10;

module.exports = {
  tokenTypes,
  allowedMimeTypes,
  itemsPerPage
}
