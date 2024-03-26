const express = require("express");
const router = express.Router();
const bouquetsController = require("../../controllers/everyday_bouquets");
const { isValidId } = require("../../middlewares/index");

router.get("/", bouquetsController.getAllBouquets);

router.get("/:bouquetId", isValidId, bouquetsController.getBouquetById);

module.exports = router;
