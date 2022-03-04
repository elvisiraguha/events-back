import express from "express";
import controller from "../controllers/user";

const router = express.Router();

router.get("/", controller.getAllUsers);
router.post("/auth/signup", controller.signup);
router.post("/auth/login", controller.signin);
router.get("/checkUserName/:userName", controller.checkUserName);

export default router;
