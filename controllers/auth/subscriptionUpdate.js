const asyncHandler = require("express-async-handler");
const { User } = require("../../models/UserModel");

const { schema } = require("../../models/UserModel");

const subscriptionUpdate = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { error } = schema.subscriptionSchema.validate(req.body);
  if (error) {
    error.message = "Wrong subscription field";
    error.status = 400;
    throw error;
  }
  const updatedUser = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  });
  res.status(200).json({
    status: "updated success",
    data: {
      result: updatedUser,
    },
  });
});

module.exports = subscriptionUpdate;
