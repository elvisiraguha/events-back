import express from "express";
import userRouter from "./user";
import eventRouter from "./events";
import admin from "./admin";
import AuthMiddleware from "../middlewares/auth";

const router = express.Router();

router.use("/user", userRouter);
router.use("/event", eventRouter);
router.use(
  "/admin",
  AuthMiddleware.isUserAuthenticated,
  AuthMiddleware.isAdmin,
  admin
);
router.use("/*", (req, res) => {
  res.status(405).json({
    status: 405,
    message: "method not allowed",
  });
});

export default router;
