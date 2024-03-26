const Bouquet = require("../models/everyday_bouquet.js");
const { HttpError } = require("../helpers/index");
const { ctrlWrapper } = require("../decorators/index.js");

const getAllBouquets = async (req, res) => {
  const result = await Bouquet.find();
  res.json(result);
};

const getBouquetById = async (req, res) => {
  const { bouquetId } = req.params;
  const result = await Bouquet.findById(bouquetId);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

module.exports = {
  getAllBouquets: ctrlWrapper(getAllBouquets),
  getBouquetById: ctrlWrapper(getBouquetById),
};
