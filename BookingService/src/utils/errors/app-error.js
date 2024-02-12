class AppError extends Error {
    constructor(name, message, description, statusCode) {
        super();
        this.name = name;
        this.description = description;
        this.statusCode = statusCode;
        this.message = message;
    }
}

module.exports = AppError;
