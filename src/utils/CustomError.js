class CustomError extends Error {
  constructor(tag, message) {
    super(`${tag} ${message}`);
    this.name = this.constructor.name;
    this.tag = tag;
    Error.captureStackTrace(this, this.constructor);
  }
}
module.exports = CustomError;
