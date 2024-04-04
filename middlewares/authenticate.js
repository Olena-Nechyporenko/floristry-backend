const { HttpError } = require("../helpers/index.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { User } = require("../models/users.js");

const { JWT_SECRET } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;

  if (!authorization) {
    return next(HttpError(401, "Authorization not define"));
  }
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    next(HttpError(401));
  }
  try {
    const { id } = jwt.verify(token, JWT_SECRET);

    console.log(id);

    const user = await User.findById(id);
    console.log("jjj");
    console.log(user);

    if (!user || !user.token || token !== user.token) {
      return next(HttpError(401));
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("An error occurred:", error);
    next(HttpError(401));
  }
};

module.exports = authenticate;
