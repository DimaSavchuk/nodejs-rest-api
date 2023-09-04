const asyncHandler = require("express-async-handler");
const path = require("path");
const Jimp = require("jimp");
const fs = require("fs/promises");
const { User } = require("../../models/UserModel");

const avatarsPath = path.join(__dirname, "..", "..", "public", "avatars");

const avatarUpdate = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error("Bad request");
  }

  const { path: tempUpload, originalname } = req.file;
  console.log({
    tempUpload,
    originalname,
  });

  const avatar = await Jimp.read(tempUpload);
  await avatar.resize(250, 250).writeAsync(tempUpload);

  const { _id } = req.user;
  const resultUpload = path.join(avatarsPath, `${_id}_${originalname}`);

  console.log(resultUpload);

  await fs.rename(tempUpload, resultUpload);

  const avatarURL = path.join("avatars", `${_id}_${originalname}`);
  await User.findByIdAndUpdate(_id, avatarURL);

  res.status(200).json({
    ResponseBody: {
      avatarURL,
    },
  });
});

module.exports = avatarUpdate;
