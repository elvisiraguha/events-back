import express from "express";
import controller from "../controllers/user";
import CommonMiddleware from "../middlewares/common";

const router = express.Router();

router.get(
  "/",
  CommonMiddleware.isUserAuthenticated,
  CommonMiddleware.isAdmin,
  controller.getAllUsers
);
router.post("/auth/signup", controller.signup);
router.post("/auth/login", controller.signin);
router.get("/checkUserName/:userName", controller.checkUserName);
router.get(
  "/booking",
  CommonMiddleware.isUserAuthenticated,
  controller.getAllBookingsFromUser
);

export default router;
