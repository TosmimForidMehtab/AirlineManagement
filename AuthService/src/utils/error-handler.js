class AppError extends Error {
    constructor(name = "AppError", message = "Something went wrong", description = "Something went wrong", statusCode = 500) {
        super();
        this.name = name;
        this.message = message;
        this.description = description;
        this.statusCode = statusCode;
    }
}

module.exports = AppError;
