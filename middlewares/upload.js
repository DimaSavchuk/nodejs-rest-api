const path = require("node:path");
const multer = require("multer");

const tempPath = path.join(__dirname, "..", "temp");

const storage = multer.diskStorage({
  destination: tempPath,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
});
module.exports = upload;
