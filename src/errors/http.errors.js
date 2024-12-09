const HttpCodes = require("../constants/http-codes");

class HttpError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}

class UnauthorizedError extends Error {
    constructor(message, status = HttpCodes.UNAUTHORIZED) {
        super(message);
        this.status = status;
    }
}

class ForbiddenError extends Error {
    constructor(message, status = HttpCodes.FORBIDDEN) {
        super(message);
        this.status = status;
    }
}

class NotFoundError extends Error {
    constructor(message, status = HttpCodes.NOT_FOUND) {
        super(message);
        this.status = status;
    }
}

module.exports = {
    HttpError,
    UnauthorizedError,
    ForbiddenError,
    NotFoundError
}