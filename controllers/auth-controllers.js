const { HttpError, sendEmail } = require("../helpers/index.js");
const { ctrlWrapper } = require("../decorators/index.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { User } = require("../models/users.js");
const { JWT_SECRET } = process.env;

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email already exists");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
  });

  const payload = {
    id: newUser._id,
  };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });

  await User.findByIdAndUpdate(newUser._id, { token });

  const confirmRegistration = {
    to: email,
    subject: "Registration successful",
    html: "Thank you for the registration! Welcome to Floristic Paradise!",
  };
  await sendEmail(confirmRegistration);

  res.status(201).json({
    token,
    user: newUser,
  });
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid");
  }
  const { _id: id } = user;
  const payload = {
    id,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
    user: { email: user.email },
  });
};

const getCurrent = async (req, res) => {
  const { email } = req.user;
  res.json({
    email,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: "" });

  res.json({
    message: "Logout success",
  });
};

module.exports = {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
};
