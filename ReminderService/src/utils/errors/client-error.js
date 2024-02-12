class ClientError extends Error {
    constructor(name = "ClientError", message = "Client Error", statusCode = 400) {
        super();
        this.name = name;
        this.message = message;
        this.statusCode = statusCode;
    }
}

module.exports = ClientError;
