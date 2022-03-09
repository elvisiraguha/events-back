import express from "express";
import controller from "../controllers/events";
import EventsMiddleware from "../middlewares/events";
import AuthMiddleware from "../middlewares/auth";

const router = express.Router();

router.get("/", controller.getAllEvents);

router.get("/:eventId", EventsMiddleware.isValidEvent, controller.getEventById);

router.post(
  "/",
  AuthMiddleware.isUserAuthenticated,
  AuthMiddleware.isOrganizer,
  controller.createEvent
);

router.patch(
  "/:eventId",
  AuthMiddleware.isUserAuthenticated,
  AuthMiddleware.isOrganizer,
  EventsMiddleware.isValidEvent,
  controller.updateEvent
);

router.delete(
  "/:eventId",
  AuthMiddleware.isUserAuthenticated,
  AuthMiddleware.isOrganizer,
  EventsMiddleware.isValidEvent,
  controller.deleteEvent
);

router.get(
  "/:eventId/booking",
  AuthMiddleware.isUserAuthenticated,
  AuthMiddleware.isOrganizer,
  EventsMiddleware.isValidEvent,
  controller.getAllBookingsForAnEvent
);

router.get(
  "/:eventId/booking/:bookingId",
  AuthMiddleware.isUserAuthenticated,
  EventsMiddleware.isValidEvent,
  EventsMiddleware.isValidBooking,
  controller.getBookingById
);

router.post(
  "/:eventId/booking",
  AuthMiddleware.isUserAuthenticated,
  EventsMiddleware.isValidEvent,
  AuthMiddleware.isUserAuthenticated,
  controller.bookAnEvent
);

router.delete(
  "/:eventId/booking/:bookingId",
  AuthMiddleware.isUserAuthenticated,
  EventsMiddleware.isValidEvent,
  EventsMiddleware.isValidBooking,
  controller.cancelBooking
);

export default router;
