const { HttpError, sendEmail } = require("../helpers/index.js");
const { ctrlWrapper } = require("../decorators/index.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
// const gravatar = require("gravatar");
// const { nanoid } = require("nanoid");

const { User } = require("../models/users.js");
const { JWT_SECRET } = process.env;

const signup = async (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email already exists");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  // Создаем нового пользователя
  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
  });

  // Генерируем JWT-токен
  const payload = {
    id: newUser._id,
  };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });

  // Обновляем поле токена в базе данных
  await User.findByIdAndUpdate(newUser._id, { token });

  // Отправляем подтверждение регистрации на электронную почту
  const confirmRegistration = {
    to: email,
    subject: "Registration successful",
    html: "Thank you for the registration! Welcome to Floristic Paradise!",
  };
  await sendEmail(confirmRegistration);

  // Возвращаем данные о пользователе с токеном
  res.status(201).json({
    token,
    user: newUser,
  });
};

// const verifyStatus = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.userId);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     // Отправляем информацию о статусе верификации пользователя
//     res.status(201).json({ verify: user.verify });
//   } catch (error) {
//     console.error("Error fetching verification status:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// const verifyEmail = async (req, res) => {
//   const { verificationToken } = req.params;

//   const user = await User.findOne({ verificationToken });

//   if (!user) {
//     throw HttpError(401, "User not found");
//   }
//   await User.findByIdAndUpdate(user._id, {
//     verify: true,
//     verificationToken: " ",
//   });
//   res.json({
//     message: "Verification successful",
//     verify: true,
//   });
// };

// const resendVerifyEmail = async (req, res) => {
//   const { email, verificationToken } = req.body;

//   const user = await User.findOne({ email });
//   if (!user) {
//     throw HttpError(400, "Missing required field email");
//   }
//   if (user.verify) {
//     throw HttpError(400, "Verification has already been passed");
//   }
//   const verifyEmail = {
//     to: email,
//     subject: "Verify email",
//     html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Click verify email</a>`,
//   };

//   await sendEmail(verifyEmail);
//   res.json({
//     message: "Verification email sent",
//   });
//   await signin(req, res);
// };

const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }
  // if (!user.verify) {
  //   throw HttpError(401, "Email not verified");
  // }
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
  // verifyEmail: ctrlWrapper(verifyEmail),
  // resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
  signin: ctrlWrapper(signin),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  // verifyStatus: ctrlWrapper(verifyStatus),
};
