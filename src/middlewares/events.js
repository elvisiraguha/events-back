import { Event, Booking } from "../models";
import { config } from "dotenv";
import CommonHelper from "../helpers/common";

config();

export default class EventsMiddleware {
  static isValidEvent = async (req, res, next) => {
    const eventId = req.params.eventId;
    const isValidId = CommonHelper.isValidMongoId(eventId);

    if (!isValidId) {
      return res.status(400).json({
        status: 400,
        message: "invalid id",
      });
    }
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        status: 404,
        message: "event not found",
      });
    }
    req.__custom = { event };
    return next();
  };

  static isValidBooking = async (req, res, next) => {
    const bookingId = req.params.bookingId;
    const isValidId = CommonHelper.isValidMongoId(bookingId);

    if (!isValidId) {
      return res.status(400).json({
        status: 400,
        message: "invalid id",
      });
    }
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({
        status: 404,
        message: "booking not found",
      });
    }
    req.__custom = { booking };
    return next();
  };
}
