import { User, OrganizerRequest } from "../models";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import CommonHelper from "../helpers/common";
import { redisClient } from "../app";

config();

const privateKey = process.env.JWT_SIGNING_KEY;

export default class AuthMiddleware {
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
        const unExpiredToken = await redisClient.get(`token-${data.userName}`);

        if (!unExpiredToken) {
          return res.status(403).json({
            status: 403,
            message: "unauthenticated attempt, token unregistered",
          });
        }

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

  static isValidUserQuery = async (req, res, next) => {
    const query = req.query;
    const queryObject = query.id
      ? { _id: query?.id }
      : { userName: query?.userName };

    if (queryObject._id && !CommonHelper.isValidMongoId(queryObject._id)) {
      return res.status(400).json({
        status: 400,
        message: "invalid id",
      });
    }

    const user = await User.findOne(queryObject);

    if (!user) {
      return res.status(404).json({
        stats: 404,
        message: "user not found",
      });
    }

    req.__user = { user };
    return next();
  };

  static isNewOrganizerRequest = async (req, res, next) => {
    const { user: requestUser } = req.__user;

    const isExistingRequest = OrganizerRequest.findOne({
      _id: requestUser._id,
    });

    if (isExistingRequest) {
      return res.status(400).json({
        stats: 400,
        message:
          "you have already submitted your request to become an organizer, be patient while we evaluate your request",
      });
    }
    return next();
  };
}
