const asyncHandler = require("express-async-handler");
const { User } = require("../../models/UserModel");

const verify = asyncHandler(async (req, res) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verificationToken });
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  await User.findByIdAndUpdate(user._id, {
    verificationToken: null,
    verify: true,
  });

  res.status(200).json({
    ResponseBody: {
      message: "Verification successful",
    },
  });
});

module.exports = verify;
