import express from "express";
import MusicController from "../controllers/MusicController.js";

const router = express.Router();

//middlewares
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/list", MusicController.list);
router.get("/listAll", MusicController.listAll);

export default router;
