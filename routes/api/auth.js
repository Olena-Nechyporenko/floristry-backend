// import express from "express";
// import validateBody from '../../decorators/validateBody.js';
// import { loginSchema, registerSchema, updateSubscription, emailSchema } from "../../models/users.js";
// import authController from "../../controllers/auth-controllers.js";

// import isEmptyBody from "../../middlewares/isEmptyBody.js";
// import authenticate from "../../middlewares/authenticate.js";
// import upload from "../../middlewares/upload.js";
const express = require("express");
const validateBody = require("../../decorators/validateBody.js");
const {
  loginSchema,
  registerSchema,
  updateSubscription,
  emailSchema,
} = require("../../models/users.js");

const authController = require("../../controllers/auth-controllers.js");

const isEmptyBody = require("../../middlewares/isEmptyBody.js");
const authenticate = require("../../middlewares/authenticate.js");
const upload = require("../../middlewares/upload.js");
const router = express.Router();
router.post(
  "/signup",
  isEmptyBody,
  validateBody(registerSchema),
  authController.signup
);
router.get("/verify/:verificationToken", authController.verifyEmail);
router.post(
  "/verify",
  validateBody(emailSchema),
  authController.resendVerifyEmail
);
router.post(
  "/signin",
  isEmptyBody,
  validateBody(loginSchema),
  authController.signin
);
router.get("/current", authenticate, authController.getCurrent);
router.post("/logout", authenticate, authController.logout);
router.patch(
  "/",
  isEmptyBody,
  authenticate,
  validateBody(updateSubscription),
  authController.updateSubscription
);
router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  authController.updateAvatar
);
module.exports = router;
