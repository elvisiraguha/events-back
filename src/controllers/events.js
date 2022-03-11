import { Event, Booking } from "../models/index";

export default class Controller {
  static getAllEvents = async (req, res) => {
    const events = await Event.find({});
    return res.status(200).json({
      status: 200,
      message: "success",
      data: events,
    });
  };

  static getEventById = async (req, res) => {
    const { event } = req.__custom;
    return res.status(200).json({
      status: 200,
      message: "success",
      data: event,
    });
  };

  static createEvent = async (req, res) => {
    const event = new Event({ ...req.body });
    event.save();
    return res.status(201).json({
      status: 201,
      message: "created",
      data: event,
    });
  };

  static updateEvent = async (req, res) => {
    const { event } = req.__custom;
    const options = {
      new: true, // return updated document
    };
    const updatedEvent = await Event.findOneAndUpdate(event, req.body, options);
    return res.status(201).json({
      status: 201,
      message: "updated",
      data: updatedEvent,
    });
  };

  static deleteEvent = async (req, res) => {
    const { event } = req.__custom;
    await Event.deleteOne({ _id: event._id });
    return res.status(204);
  };

  static getAllBookingsForAnEvent = async (req, res) => {
    const { event } = req.__custom;
    const bookings = await Booking.find({ event: event._id });
    return res.status(200).json({
      status: 200,
      message: "success",
      data: bookings,
    });
  };

  static bookAnEvent = async (req, res) => {
    const { event } = req.__custom;
    const { user } = req.__user;

    const booking = new Booking({
      ...req.body,
      event: event._id,
      happeningAt: event.happeningAt,
      attendee: user._id,
    });
    booking.save();
    return res.status(201).json({
      status: 201,
      message: "created",
      data: booking,
    });
  };

  static getBookingById = async (req, res) => {
    const { booking } = req.__custom;
    return res.status(200).json({
      status: 200,
      message: "success",
      data: booking,
    });
  };

  static cancelBooking = async (req, res) => {
    const { booking } = req.__custom;
    await Booking.deleteOne({ _id: booking._id });
    return res.status(201).json({
      status: 204,
      message: "deleted",
    });
  };
}
