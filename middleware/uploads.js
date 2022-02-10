const multer = require("multer")

// Setting multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, new Date() + '-' + file.originalname)
  },
});


const allowTypes = ["image/png", "image/jpg", "image/jpeg"];

const uploads = multer({
  storage,
  limits: {
    fieldSize: 2 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    if (allowTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
  preserverPath: true,
});


module.exports = uploads;