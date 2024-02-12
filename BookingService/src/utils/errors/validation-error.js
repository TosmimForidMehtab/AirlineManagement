const { StatusCodes } = require("http-status-codes");
class ValidationError extends Error {
    constructor(error) {
        super();
        let description = [];
        error.errors.forEach((err) => {
            description.push(err.message);
        });
        this.name = "ValidationError";
        this.description = description;
        this.statusCode = StatusCodes.BAD_REQUEST;
        this.message = "Invalid data sent in the request";
    }
}

module.exports = ValidationError;
