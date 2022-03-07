import { User, Booking } from "../models/index";
import AuthHelper from "../helpers/index";

export default class Controller {
  static getAllUsers = async (req, res) => {
    const users = await User.find({}, "userName firstName lastName email role");
    res.status(200).json({
      status: 200,
      message: "success",
      data: users,
    });
  };

  static signup = async (req, res) => {
    const isEmailExist = await User.findOne({ email: req.body.email });
    if (isEmailExist) {
      return res.status(409).json({
        stats: 409,
        message: `${isEmailExist.email} is taken`,
      });
    }
    const password = await AuthHelper.hashPassword(req.body.password);
    const user = new User({ ...req.body, password });
    await user.save();
    const { userName, firstName, lastName, email, role } = user;
    res.status(201).json({
      status: 201,
      message: "success",
      data: {
        userName,
        firstName,
        lastName,
        email,
        role,
      },
    });
  };

  static signin = async (req, res) => {
    const user = await User.findOne({ email: req.body.email }).exec();

    if (!user) {
      return res.status(403).json({
        stats: 403,
        message: "incorrect email or password",
      });
    }
    const isPasswordCorrect = await AuthHelper.comparePasswords(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(403).json({
        stats: 403,
        message: "incorrect email or password",
      });
    }
    const { userName, firstName, lastName, email, role } = user;

    res.status(201).json({
      stats: 201,
      message: "success",
      data: { userName, firstName, lastName, email, role },
    });
  };

  static checkUserName = async (req, res) => {
    const user = await User.findOne({ userName: req.params.userName });
    if (user) {
      return res.status(409).json({
        stats: 409,
        message: `${user.userName} is taken`,
      });
    }
    return res.status(202).json({
      stats: 202,
      message: `${req.params.userName} is available`,
    });
  };

  static getAllBookingsFromUser = async (req, res) => {
    const user = req.param;
    const bookings = await Booking.find({ user });
    return res.status(200).json({
      status: 200,
      message: "success",
      data: bookings,
    });
  };
}
