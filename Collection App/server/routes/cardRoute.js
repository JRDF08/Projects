import express from "express";
import CardController from "../controllers/CardController.js";

const router = express.Router();

//middlewares
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/list", CardController.list);
router.put("/:cardNumber", CardController.updateIsAdded);

export default router;
