const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const asyncHandler = require("express-async-handler");
const { User, schema } = require("../../models/UserModel");
const sendEmail = require("../../services/email/sendEmail");

const { BASE_URL } = process.env;

const register = asyncHandler(async (req, res) => {
  const { error } = schema.registerSchema.validate(req.body);
  if (error) {
    res.status(400);
    console.log(`${error.message}`.red.bold);
    throw new Error("Check the data you entered");
  }

  const { email, password } = req.body;
  console.log(email);
  const user = await User.findOne({ email });
  if (user) {
    res.status(409);
    throw new Error("Email already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = await gravatar.url(email);
  const verificationToken = nanoid();

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const verify = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click verify email</a>`,
  };

  sendEmail(verify);

  res.status(201).json({
    code: 201,
    message: "success",
    user: newUser,
  });
});

module.exports = register;
