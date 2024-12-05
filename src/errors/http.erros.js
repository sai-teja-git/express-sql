const HttpCodes = require("../constants/http-codes");

class HttpError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}

class UnauthorizedError extends Error {
    constructor(message) {
        super(message);
        this.status = HttpCodes.UNAUTHORIZED;
    }
}

class ForbiddenError extends Error {
    constructor(message) {
        super(message);
        this.status = HttpCodes.FORBIDDEN;
    }
}

class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.status = HttpCodes.NOT_FOUND;
    }
}

module.exports = {
    HttpError,
    UnauthorizedError,
    ForbiddenError,
    NotFoundError
}