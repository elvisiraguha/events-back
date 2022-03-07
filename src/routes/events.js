import express from "express";
import controller from "../controllers/events";
import CommonMiddleware from "../middlewares/common";

const router = express.Router();

router.get("/", controller.getAllEvents);

router.get(
  "/:eventId",
  CommonMiddleware.isValidId,
  CommonMiddleware.isValidEvent,
  controller.getEventById
);

router.post("/", controller.createEvent);

router.patch(
  "/:eventId",
  CommonMiddleware.isValidId,
  CommonMiddleware.isValidEvent,
  controller.updateEvent
);

router.delete(
  "/:eventId",
  CommonMiddleware.isValidId,
  CommonMiddleware.isValidEvent,
  controller.deleteEvent
);

router.get(
  "/:eventId/booking",
  CommonMiddleware.isValidId,
  CommonMiddleware.isValidEvent,
  controller.getAllBookingsForAnEvent
);

router.get(
  "/:eventId/booking/:bookingId",
  CommonMiddleware.isValidId,
  CommonMiddleware.isValidEvent,
  controller.getBookingById
);

router.post(
  "/:eventId/booking",
  CommonMiddleware.isValidId,
  CommonMiddleware.isValidEvent,
  controller.bookAnEvent
);

router.delete(
  "/:eventId/booking/:bookingId",
  CommonMiddleware.isValidId,
  CommonMiddleware.isValidEvent,
  controller.cancelBooking
);

export default router;
