const { User, Role } = require("../models/index");
const { ValidationError, NotFoundError } = require("../utils/validation-error");
const ClientError = require("../utils/ClientErrors");
class UserRepository {
    async createUser(data) {
        try {
            const user = await User.create(data);
            return user;
        } catch (error) {
            if (error.name === "SequelizeValidationError") {
                throw new ValidationError(error);
            }
            console.log("Something went wrong in the repository layer");
            throw error;
        }
    }

    async deleteUser(userId) {
        try {
            await User.destroy({
                where: {
                    id: userId,
                },
            });
        } catch (error) {
            if (error.name === "SequelizeValidationError") {
                throw new ValidationError(error);
            }
            console.log("Something went wrong in the repository layer");
            throw error;
        }
    }

    async getById(userId) {
        try {
            const user = await User.findByPk(userId, {
                attributes: ["id", "email"],
            });
            return user;
        } catch (error) {
            if (error.name === "SequelizeValidationError") {
                throw new ValidationError(error);
            }

            if (error.name === "SequelizeNotFound") {
                throw new NotFoundError(error);
            }
            console.log("Something went wrong in the repository layer");
            throw error;
        }
    }

    async getByEmail(email) {
        try {
            const user = await User.findOne({ where: { email } });
            if (!user) {
                throw new ClientError("EmailNotFound", "Invalid email", "Please enter a valid email", 404);
            }
            return user;
        } catch (error) {
            if (error.name === "SequelizeValidationError") {
                throw new ValidationError(error);
            }

            if (error.name === "SequelizeNotFound") {
                throw new NotFoundError(error);
            }
            console.log("Something went wrong in the repository layer");
            throw error;
        }
    }

    async isAdmin(userId) {
        try {
            const user = await User.findByPk(userId);
            const adminRole = await Role.findOne({ where: { name: "ADMIN" } });
            return user.hasRole(adminRole);
        } catch (error) {
            if (error.name === "SequelizeValidationError") {
                throw new ValidationError(error);
            }

            if (error.name === "SequelizeNotFound") {
                throw new NotFoundError(error);
            }
            console.log("Something went wrong in the repository layer");
            throw error;
        }
    }

    async isAirlineBusiness(userId) {
        try {
            const user = await User.findByPk(userId);
            const airlineBusinessRole = await Role.findOne({
                where: { name: "AIRLINE_BUSINESS" },
            });
            return user.hasRole(airlineBusinessRole);
        } catch (error) {
            if (error.name === "SequelizeValidationError") {
                throw new ValidationError(error);
            }

            if (error.name === "SequelizeNotFound") {
                throw new NotFoundError(error);
            }
            console.log("Something went wrong in the repository layer");
            throw error;
        }
    }
}

module.exports = UserRepository;
