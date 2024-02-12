class ServerError extends Error {
    constructor(name = "ServerError", message = "Internal Server Error") {
        super();
        this.name = name;
        this.message = message;
        this.statusCode = 500;
    }
}

module.exports = ServerError;
