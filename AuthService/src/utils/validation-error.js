const AppError = require("./error-handler");

class ValidationError extends AppError {
    constructor(error) {
        let errorName = error.name;
        let description = [];
        error.errors.forEach((err) => {
            description.push(err.message);
        });
        super(errorName, "Invalid data provided in the request", description, 400);
    }
}

class NotFoundError extends AppError {
    constructor(error) {
        let errorName = error.name;
        let description = [];
        error.errors.forEach((err) => {
            description.push(err.message);
        });
        super(errorName, "Requested data not found", description, 404);
    }
}

module.exports = {
    ValidationError,
    NotFoundError,
};
