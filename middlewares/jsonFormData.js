const jsonFormData = () => 
  (req, res, next) => {
    try {
      console.log('json:', req.body);
      req.body = JSON.parse(req.body.json);
      next()
    } catch (error) {
      next(error);
    }
  };

module.exports = jsonFormData;
