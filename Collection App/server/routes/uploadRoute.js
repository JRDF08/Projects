import express from "express";

import upload from "../middlewares/upload.js";
import UploadCardController from "../controllers/UploadCardController.js";

const router = express.Router();

//middlewares
router.use(express.urlencoded({ extended: true }));

router.post("/upload", upload.single("cardImage"), UploadCardController.upload);

export default router;
