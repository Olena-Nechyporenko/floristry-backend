const { HttpError } = require("../helpers/index");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    console.log(schema);
    if (error) {
      return next(HttpError(400, error.message));
    }
    next();
  };
  return func;
};

module.exports = validateBody;
