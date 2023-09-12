const asyncHandler = require("express-async-handler");
const { schema, User } = require("../../models/UserModel");
const sendEmail = require("../../helpers/sendEmail");

const { BASE_URL } = process.env;

const reverify = asyncHandler(async (req, res) => {
  const { error } = schema.reverifySchema.validate(req.body);
  if (error) {
    res.status(400);
    throw new Error("Check the data you entered");
  }

  const { email } = req.body;
  const user = await User.findOne({ email });

  const verify = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Click verify email</a>`,
  };

  if (user.verify) {
    res.status(400);
    throw new Error("Verification has already been passed");
  } else {
    sendEmail(verify);

    res.status(200).json({
      code: 200,
      email: email,
    });
  }

  console.log(user);
});

module.exports = reverify;
