const jsonFormData = () => 
  (req, res, next) => {
    try {
      req.body = JSON.parse(req.body.json);
      next()
    } catch (error) {
      next(error);
    }
  };

module.exports = jsonFormData;
