const asyncHandler = require("express-async-handler");
const { User } = require("../../models/UserModel");

const logout = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json({
    code: 204,
    message: "Logout success",
  });
});

module.exports = logout;
