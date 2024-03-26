const { isValidObjectId } = require("mongoose");
const { HttpError } = require("../helpers/index");

const isValidId = (req, res, next) => {
  const { bouquetId } = req.params;
  if (!isValidObjectId(bouquetId)) {
    next(HttpError(400, `${bouquetId} is not valid id`));
  }
  next();
};

module.exports = isValidId;
