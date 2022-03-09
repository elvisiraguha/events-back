import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

const privateKey = process.env.JWT_SIGNING_KEY;
export default class AuthHelper {
  static hashPassword = async (plainText) => {
    const hashedText = await bcrypt.hash(plainText, bcrypt.genSaltSync(10));
    return hashedText;
  };

  static comparePasswords = async (plainText = "", hashedText) => {
    const isSame = await bcrypt.compare(plainText, hashedText);
    return isSame;
  };

  static signToken = async (data) => {
    const token = await jwt.sign(data, privateKey, {
      expiresIn: "1h",
    });
    return token;
  };
}
