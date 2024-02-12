const UserRepository = require("../repository/user-repository");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { JWT_SECRET } = require("../config/serverConfig");
const AppError = require("../utils/error-handler");
const { NotFoundError } = require("../utils/validation-error");

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async createUser(data) {
        try {
            const user = await this.userRepository.createUser(data);
            return user;
        } catch (error) {
            if (error.name === "SequelizeValidationError") {
                throw error;
            }
            console.log("Something went wrong in the services layer");

            throw new AppError("Internal Server Error", "Something went wrong", "Failed to create user", 500);
        }
    }

    async deleteUser(userId) {
        try {
            await this.userRepository.deleteUser(userId);
        } catch (error) {
            if (error.name === "SequelizeValidationError") {
                throw error;
            }

            if (error.name === "SequelizeNotFound") {
                throw error;
            }
            console.log("Something went wrong in the services layer");

            throw new AppError("Internal Server Error", "Something went wrong", "Failed to delete user", 500);
        }
    }

    async getById(userId) {
        try {
            const user = await this.userRepository.getById(userId);
            return user;
        } catch (error) {
            if (error.name === "SequelizeValidationError") {
                throw error;
            }

            if (error.name === "SequelizeNotFound") {
                throw error;
            }
            console.log("Something went wrong in the services layer");
            throw new AppError("Internal Server Error", "Something went wrong", "Failed to get user", 500);
        }
    }

    createToken(user) {
        try {
            const token = jwt.sign(user, JWT_SECRET, { expiresIn: "2d" });
            return token;
        } catch (error) {
            console.log("Something went wrong in the services layer");
            throw { error };
        }
    }

    verifyToken(token) {
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            return decoded;
        } catch (error) {
            console.log("Something went wrong in the services layer");
            throw error;
        }
    }

    async checkPassword(userInputPassword, hashedPassword) {
        try {
            return await bcrypt.compare(userInputPassword, hashedPassword);
        } catch (error) {
            console.log("Something went wrong in the services layer");
            throw error;
        }
    }

    async signIn(email, password) {
        try {
            const user = await this.userRepository.getByEmail(email);
            const match = await this.checkPassword(password, user.password);
            if (!match) {
                const error = new Error();
                error.message = "Invalid Email or Password";
                error.name = "SequelizeValidationError";
                error.errors = [
                    {
                        message: "Invalid Email or Password",
                    },
                ];
                throw new NotFoundError(error);
            }
            const token = this.createToken({ email: user.email, id: user.id });
            return token;
        } catch (error) {
            if (error.name === "EmailNotFound") {
                throw error;
            }
            if (error.name === "SequelizeValidationError") {
                throw error;
            }

            if (error.name === "SequelizeNotFound") {
                throw error;
            }
        }
    }

    async isAuthenticated(token) {
        try {
            const decoded = this.verifyToken(token);
            if (!decoded) {
                const error = new Error();
                error.message = "Invalid Token";
                error.status = 400;
                throw { error };
            }
            const user = await this.userRepository.getById(decoded.id);
            if (!user) {
                const error = new Error();
                error.message = "Invalid User";
                error.status = 400;
                throw { error };
            }
            return user.id;
        } catch (error) {
            console.log("Something went wrong in the services layer");
            throw { error };
        }
    }

    async isAdmin(userId) {
        try {
            return await this.userRepository.isAdmin(userId);
        } catch (error) {
            console.log("Something went wrong in the services layer");
            throw { error };
        }
    }

    async isAirlineBusiness(userId) {
        try {
            return await this.userRepository.isAirlineBusiness(userId);
        } catch (error) {
            console.log("Something went wrong in the services layer");
            throw { error };
        }
    }
}

module.exports = UserService;
