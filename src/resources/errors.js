class ServerError {

  constructor({ name, message, code }) {

    this.name = name || "ServerError";
    this.message = message || "A generic server error has occurred. Please contact an administrator. W";
    this.code = code || "SERVER_ERROR";

  }

  toJson() {

    const { name, message, code } = this;

    return { name, message, code };

  }

}

class RequestCancelledError extends ServerError {

  constructor(
    message = "The request has been cancelled.",
    code = "REQUEST_CANCELLED_ERROR") {

    super({
      "name": "RequestCancelledError",
      message,
      code,
    });

  }

}

module.exports = { ServerError, RequestCancelledError };
