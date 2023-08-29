const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const { User } = require("../models/UserModel");

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  const { httpError } = require("../helpers");
  if (bearer !== "Bearer") {
    next(httpError(401, "Not authorized"));
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user) {
      next(httpError(401, "Not authorized"));
    }
    req.user = user;
    next();
  } catch {
    next(httpError(401, "Not authorized"));
  }
};

module.exports = authenticate;
