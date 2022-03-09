import { User, Booking } from "../models/index";
import AuthHelper from "../helpers/index";

export default class Controller {
  static getUser = async (req, res) => {
    const { user } = req.__user;
    const { userName, firstName, lastName, email } = user;
    res.status(200).json({
      status: 200,
      message: "success",
      data: { userName, firstName, lastName, email },
    });
  };

  static getCurrentUser = async (req, res) => {
    const { user } = req.__user;
    const { userName, firstName, lastName, email } = user;
    res.status(200).json({
      status: 200,
      message: "success",
      data: { userName, firstName, lastName, email },
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
    const { userName, firstName, lastName, email, role, _id } = user;

    const token = await AuthHelper.signToken({
      userName,
      firstName,
      lastName,
      email,
      role,
      _id,
    });

    res.status(201).json({
      status: 201,
      message: "success",
      data: {
        userName,
        firstName,
        lastName,
        email,
        role,
        _id,
      },
      token,
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
    const { userName, firstName, lastName, email, role, _id } = user;

    const token = await AuthHelper.signToken({
      userName,
      firstName,
      lastName,
      email,
      role,
      _id,
    });

    res.status(201).json({
      stats: 201,
      message: "success",
      data: { userName, firstName, lastName, email, role, _id },
      token,
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
    const { user } = req.__user;

    const bookings = await Booking.find({ attendee: user._id });
    return res.status(200).json({
      status: 200,
      message: "success",
      data: bookings,
    });
  };

  static updateUserProfile = async (req, res) => {
    const user = req.__user;
    const options = {
      new: true,
      fields: "userName firstName lastName email role",
    };
    const updatedUser = await User.findOneAndUpdate(user, req.body, options);
    return res.status(201).json({
      status: 201,
      message: "updated",
      data: updatedUser,
    });
  };
}
