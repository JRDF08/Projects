import express from "express";
import UserController from "../controllers/UserController.js";

const router = express.Router();

router.get("/list", UserController.list);

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.delete("/logout", UserController.logout);

export default router;
