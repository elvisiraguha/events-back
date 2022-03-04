import bcrypt from "bcryptjs";

class PasswordHelper {
  static hashPassword = async (plainText) => {
    const hashedText = await bcrypt.hash(plainText, bcrypt.genSaltSync(10));
    return hashedText;
  };

  static comparePasswords = async (plainText = "", hashedText) => {
    const isSame = await bcrypt.compare(plainText, hashedText);
    return isSame;
  };
}

export default PasswordHelper;
