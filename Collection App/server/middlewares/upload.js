import multer from "multer";

const storage = multer.diskStorage({
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const fileFilter = (req, file, callback) => {
  if (file.mimetype.startsWith("image/")) {
    callback(null, true);
  } else {
    callback(new Error("Only image files are allowed!"), false);
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
