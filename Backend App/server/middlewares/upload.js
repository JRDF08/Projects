import multer from "multer";

const storage = multer.diskStorage({
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const fileFilter = (req, file, callback) => {
  if (
    file.mimetype.startsWith("audio/") ||
    file.mimetype.startsWith("image/")
  ) {
    callback(null, true);
  } else {
    callback(new Error("Only audio and image files are allowed!"), false);
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
