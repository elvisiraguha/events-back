import express from "express";
import controller from "../controllers/admin";
import AuthMiddleware from "../middlewares/auth";
import OrganizerReqestMiddleware from "../middlewares/organizerRequest";

const router = express.Router();

router.get("/users", controller.getUsers);
router.get("/events", controller.getEvents);
router.get("/bookings", controller.getBookings);
router.patch(
  "/users/changeStatus",
  AuthMiddleware.isValidUserQuery,
  controller.changeUserActiveStatus
);

router.get("/users/organizersRequests", controller.getOrganizerRequests);

router.patch(
  "/users/makeOrganizer",
  AuthMiddleware.isValidUserQuery,
  OrganizerReqestMiddleware.isValidOrganizerRequest,
  controller.makeOrganizer
);

router.delete(
  "/users/hazardouslyDeleteUser",
  AuthMiddleware.isValidUserQuery,
  controller.deleteUser
);

export default router;
