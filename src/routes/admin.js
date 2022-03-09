import express from "express";
import controller from "../controllers/admin";
import AuthMiddleware from "../middlewares/auth";

const router = express.Router();

router.get("/users", controller.getUsers);
router.get("/events", controller.getEvents);
router.get("/bookings", controller.getBookings);
router.patch(
  "/users/changeStatus",
  AuthMiddleware.isValidUserQuery,
  controller.changeUserActiveStatus
);

export default router;
