export default class CommonHelper {
  static isValidMongoId = (id) => {
    if (id.length !== 24) {
      return false;
    } else return true;
  };
}
