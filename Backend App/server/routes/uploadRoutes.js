import express from "express";
import upload from "../middlewares/upload.js";
import UploadController from "../controllers/UploadController.js";

const router = express.Router();

//middlewares
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.patch("/soft-delete/:title", UploadController.softDelete);
router.delete("/delete/:title", UploadController.delete);
router.put("/update/:title", UploadController.update);
router.post(
  "/upload",
  upload.fields([
    { name: "track", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]),
  UploadController.upload
);

export default router;
