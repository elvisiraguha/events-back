import { User, OrganizerRequest } from "../models";
import { config } from "dotenv";

config();

export default class AuthMiddleware {
  static findOrganizerRequest = async (id) => {
    const request = await OrganizerRequest.findOne({
      user: id,
    });
    return request;
  };

  static isNewOrganizerRequest = async (req, res, next) => {
    const { user } = req.__user;

    if (user.role !== "user") {
      return res.status(400).json({
        stats: 400,
        message: "unauthorized, this profile can not have an organizer profile",
      });
    }

    const isExistingRequest = await AuthMiddleware.findOrganizerRequest(
      user._id
    );

    if (isExistingRequest) {
      return res.status(400).json({
        stats: 400,
        message:
          "you have already submitted your request to become an organizer, be patient while we evaluate your request",
      });
    }
    return next();
  };

  static isValidOrganizerRequest = async (req, res, next) => {
    const { user } = req.__user;

    const isExistingRequest = await AuthMiddleware.findOrganizerRequest(
      user._id
    );

    if (!isExistingRequest) {
      return res.status(400).json({
        stats: 400,
        message: "this user has not requested to be an organizer yet",
      });
    }
    return next();
  };
}
