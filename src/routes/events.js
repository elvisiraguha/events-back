import express from "express";
import controller from "../controllers/events";
import CommonMiddleware from "../middlewares/common";

const router = express.Router();

router.get("/", controller.getAllEvents);

router.get("/:eventId", CommonMiddleware.isValidEvent, controller.getEventById);

router.post(
  "/",
  CommonMiddleware.isUserAuthenticated,
  CommonMiddleware.isOrganizer,
  controller.createEvent
);

router.patch(
  "/:eventId",
  CommonMiddleware.isUserAuthenticated,
  CommonMiddleware.isOrganizer,
  CommonMiddleware.isValidEvent,
  controller.updateEvent
);

router.delete(
  "/:eventId",
  CommonMiddleware.isUserAuthenticated,
  CommonMiddleware.isOrganizer,
  CommonMiddleware.isValidEvent,
  controller.deleteEvent
);

router.get(
  "/:eventId/booking",
  CommonMiddleware.isUserAuthenticated,
  CommonMiddleware.isOrganizer,
  CommonMiddleware.isValidEvent,
  controller.getAllBookingsForAnEvent
);

router.get(
  "/:eventId/booking/:bookingId",
  CommonMiddleware.isUserAuthenticated,
  CommonMiddleware.isValidEvent,
  CommonMiddleware.isValidBooking,
  controller.getBookingById
);

router.post(
  "/:eventId/booking",
  CommonMiddleware.isUserAuthenticated,
  CommonMiddleware.isValidEvent,
  CommonMiddleware.isUserAuthenticated,
  controller.bookAnEvent
);

router.delete(
  "/:eventId/booking/:bookingId",
  CommonMiddleware.isUserAuthenticated,
  CommonMiddleware.isValidEvent,
  CommonMiddleware.isValidBooking,
  controller.cancelBooking
);

export default router;
