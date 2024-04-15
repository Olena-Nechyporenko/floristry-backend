const express = require("express");
const router = express.Router();
const authController = require("../../controllers/auth-controllers.js");

const { loginSchema, registerSchema } = require("../../models/users.js");

const { validateBody } = require("../../decorators/index.js");
const { isEmptyBody, authenticate } = require("../../middlewares/index.js");

router.post(
  "/signup",
  isEmptyBody,
  validateBody(registerSchema),
  authController.signup
);
router.post(
  "/signin",
  isEmptyBody,
  validateBody(loginSchema),
  authController.signin
);
router.get("/current", authenticate, authController.getCurrent);
router.post("/logout", authenticate, authController.logout);

module.exports = router;
