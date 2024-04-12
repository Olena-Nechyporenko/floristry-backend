const express = require("express");
const validateBody = require("../../decorators/validateBody.js");
const { loginSchema, registerSchema } = require("../../models/users.js");

const authController = require("../../controllers/auth-controllers.js");

const isEmptyBody = require("../../middlewares/isEmptyBody.js");
const authenticate = require("../../middlewares/authenticate.js");
const router = express.Router();
router.post(
  "/signup",
  isEmptyBody,
  validateBody(registerSchema),
  authController.signup
);
// router.get("/verify/:verificationToken", authController.verifyEmail);
// router.post(
//   "/verify",
//   validateBody(emailSchema),
//   authController.resendVerifyEmail
// );
// router.get("/verifyStatus/:userId", authController.verifyStatus);
router.post(
  "/signin",
  isEmptyBody,
  validateBody(loginSchema),
  authController.signin
);
router.get("/current", authenticate, authController.getCurrent);
router.post("/logout", authenticate, authController.logout);

module.exports = router;
