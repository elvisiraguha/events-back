import { User, Event, Booking } from "../models/index";
export default class Controller {
  static getUsers = async (req, res) => {
    const users = await User.find({}, "userName firstName lastName email role");
    res.status(200).json({
      status: 200,
      message: "success",
      data: users,
    });
  };

  static getEvents = async (req, res) => {
    const events = await Event.find({});
    res.status(200).json({
      status: 200,
      message: "success",
      data: events,
    });
  };

  static getBookings = async (req, res) => {
    const bookings = await Booking.find({});
    res.status(200).json({
      status: 200,
      message: "success",
      data: bookings,
    });
  };

  static changeUserActiveStatus = async (req, res) => {
    const { user } = req.__user;
    const options = {
      new: true,
      fields: "userName firstName lastName email role active",
    };
    const updatedUser = await User.findOneAndUpdate(
      user,
      { active: !user.active },
      options
    );
    return res.status(201).json({
      status: 201,
      message: "updated",
      data: updatedUser,
    });
  };
}
