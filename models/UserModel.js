const { Schema, model } = require("mongoose");

const { auth } = require("../schema");
const validate = auth;

const usersSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Set password for user"],
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: String,
  avatarURL: String,
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, "Verify token is required"],
  },
});

const User = model("user", usersSchema);

const registerSchema = validate.register;
const loginSchema = validate.login;
const subscriptionSchema = validate.subscription;
const reverifySchema = validate.reverify;

const schema = {
  registerSchema,
  loginSchema,
  subscriptionSchema,
  reverifySchema,
};

module.exports = { User, schema };
