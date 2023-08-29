const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");

const configPath = path.join(__dirname, "..", "..", "config", ".env");
require("dotenv").config({ path: configPath });

const asyncHandler = require("express-async-handler");
const { User, schema } = require("../../models/UserModel");

const { SECRET_KEY } = process.env;

const login = asyncHandler(async (req, res) => {
  const { error } = schema.registerSchema.validate(req.body);
  if (error) {
    res.status(400);
    console.log(`${error.message}`.red.bold);
    throw new Error("Check the data you entered");
  }

  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401);
    throw new Error("Email, or password invalid");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    res.status(401);
    throw new Error("Email, or password invalid");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  res.status(200).json({
    code: 200,
    message: "seccess",
    token: token,
    user: user,
  });
});

module.exports = login;
