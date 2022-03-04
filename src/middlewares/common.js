import { Event } from "../models";

export default class CommonMiddleware {
  static isValidId = async (req, res, next) => {
    if (req.params.id.length === 24) {
      return next();
    } else {
      return res.status(400).json({
        status: 400,
        message: "invalid id",
      });
    }
  };

  static isValidEvent = async (req, res, next) => {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({
        status: 404,
        message: "event not found",
      });
    }
    req.__custom = { event };
    return next();
  };
}
