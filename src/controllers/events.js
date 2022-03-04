import { User, Event } from "../models/index";

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
    return res.status(201).json({
      status: 204,
      message: "deleted",
    });
  };
}
