class ServerError extends Error {

  constructor({ name, message, code }) {

    super();
    this.name = name || "ServerError";
    this.message = message || "A generic server error has occurred. Please contact an administrator.";
    this.code = code || "SERVER_ERROR";

  }

  toJson() {

    const { name, message, code } = this;

    return { name, message, code };

  }

}

class RequestCancelledError extends Error {

  constructor({ name, message, code }) {

    super();
    this.name = name || "RequestCancelledError";
    this.message = message || "The request has been cancelled.";
    this.code = code || "REQUEST_CANCELLED_ERROR";

  }

}

module.exports = { ServerError, RequestCancelledError };
