import express from "express";
import userRouter from "./user";
import eventRouter from "./events";

const router = express.Router();

router.use("/user", userRouter);
router.use("/event", eventRouter);
router.use("/*", (req, res) => {
  res.status(405).json({
    status: 405,
    message: "method not allowed",
  });
});

export default router;
