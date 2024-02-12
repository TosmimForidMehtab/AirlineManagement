const AppError = require("./error-handler");

class ClientError extends AppError {
    constructor(name = "ClientError", message = "Something went wrong", description = "Something went wrong", statusCode = 400) {
        super(name, message, description, statusCode);
    }
}

module.exports = ClientError;
