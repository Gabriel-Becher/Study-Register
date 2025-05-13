const multer = require("multer");
const { extname, resolve } = require("path");

module.exports = {
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype !== "image/png" &&
      file.mimetype !== "image/jpeg" &&
      file.mimetype !== "image/jpg"
    ) {
      return cb(new multer.MulterError("Image must be PNG, JPEG or JPG"));
    }
    return cb(null, true);
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, resolve(__dirname, "..", "..", "uploads", "images"));
    },
    filename: (req, file, cb) => {
      cb(
        null,
        `${Date.now()}${"Cell" + req.body.cell_id}${extname(file.originalname)}`
      );
    },
  }),
};
