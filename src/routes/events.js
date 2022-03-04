import express from "express";
import controller from "../controllers/events";
import CommonMiddleware from "../middlewares/common";

const router = express.Router();

router.get("/", controller.getAllEvents);
router.get(
  "/:id",
  CommonMiddleware.isValidId,
  CommonMiddleware.isValidEvent,
  controller.getEventById
);
router.post("/", controller.createEvent);
router.patch(
  "/:id",
  CommonMiddleware.isValidId,
  CommonMiddleware.isValidEvent,
  controller.updateEvent
);
router.delete(
  "/:id",
  CommonMiddleware.isValidId,
  CommonMiddleware.isValidEvent,
  controller.deleteEvent
);

export default router;
