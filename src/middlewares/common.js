import { Event, Booking, User } from "../models";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

const privateKey = process.env.JWT_SIGNING_KEY;
export default class CommonMiddleware {
  static isValidEvent = async (req, res, next) => {
    const eventId = req.params.eventId;
    if (eventId.length !== 24) {
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
    if (bookingId.length !== 24) {
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

  static isUserAuthenticated = async (req, res, next) => {
    const token = req.headers.authorization?.split("Bearer ")[1];
    if (!token) {
      return res.status(403).json({
        status: 403,
        message: "unauthenticated attempt, invalid token",
      });
    } else {
      try {
        const data = await jwt.verify(token, privateKey);
        const user = await User.findById(data._id);

        if (!user) {
          return res.status(403).json({
            status: 403,
            message: "unauthenticated attempt, unregistered user",
          });
        }

        req.__user = { user };
        return next();
      } catch (err) {
        return res.status(403).json({
          status: 403,
          message: `unauthenticated attempt, ${err.message}`,
        });
      }
    }
  };

  static isAdmin = async (req, res, next) => {
    const { user } = req.__user;
    if (user.role !== "admin") {
      return res.status(403).json({
        status: 403,
        message:
          "unauthorized attempt, you are not allowed to access this resource",
      });
    } else {
      return next();
    }
  };

  static isOrganizer = async (req, res, next) => {
    const { user } = req.__user;
    if (user.role !== "organizer") {
      return res.status(403).json({
        status: 403,
        message:
          "unauthorized attempt, you are not allowed to access this resource",
      });
    } else {
      return next();
    }
  };
}
