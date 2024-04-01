const express = require("express");
const router = express.Router();
const consultationsController = require("../../controllers/consultations");
const { isEmptyBody } = require("../../middlewares/index");
const { validateBody } = require("../../decorators/index");
const { consultationSchema } = require("../../schemas/consultation-schema");

router.post(
  "/",
  isEmptyBody,
  validateBody(consultationSchema),
  consultationsController.sendUserData
);

module.exports = router;
