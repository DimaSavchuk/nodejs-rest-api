const asyncHandler = require("express-async-handler");
const getCurrent = asyncHandler(async (req, res) => {
  const { email, subscription } = req.user;

  res.status(200).json({
    code: 200,
    message: "seccess",
    ResponseBody: {
      email,
      subscription,
    },
  });
});

module.exports = getCurrent;
