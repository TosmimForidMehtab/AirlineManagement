const UserService = require("../services/user-services");

const userService = new UserService();
const createUser = async (req, res) => {
    try {
        const response = await userService.createUser({
            email: req.body.email,
            password: req.body.password,
        });

        return res.status(201).json({
            message: "Successfully created a user",
            data: response,
            success: true,
            err: {},
        });
    } catch (error) {
        console.log("Something went wrong in the controllers layer");
        console.log(error);
        return res.status(error.statusCode).json({
            message: error.message,
            data: {},
            success: false,
            err: error.description,
        });
    }
};

const signIn = async (req, res) => {
    try {
        const response = await userService.signIn(req.body.email, req.body.password);
        return res.status(200).json({
            message: "Successfully signed in",
            data: response,
            success: true,
            err: {},
        });
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode).json({
            message: error.message,
            data: {},
            success: false,
            err: error.description,
        });
    }
};

const isAuthenticated = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        const response = await userService.isAuthenticated(token);
        return res.status(200).json({
            message: "User is authenticated",
            data: response,
            success: true,
            err: {},
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            data: {},
            success: false,
            err: error,
        });
    }
};

const isAdmin = async (req, res) => {
    try {
        const response = await userService.isAdmin(req.body.id);
        if (response === false) {
            return res.status(401).json({
                message: "User is not Admin",
                data: {},
                success: false,
                err: {},
            });
        }
        return res.status(200).json({
            message: "User is Admin",
            data: response,
            success: true,
            err: {},
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            data: {},
            success: false,
            err: error,
        });
    }
};

const isAirlineBusiness = async (req, res) => {
    try {
        const response = await userService.isAirlineBusiness(req.body.id);
        if (response === false) {
            return res.status(401).json({
                message: "User is not Airline Business",
                data: {},
                success: false,
                err: {},
            });
        }
        return res.status(200).json({
            message: "User is Airline Business",
            data: response,
            success: true,
            err: {},
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            data: {},
            success: false,
            err: error,
        });
    }
};

module.exports = {
    createUser,
    signIn,
    isAuthenticated,
    isAdmin,
    isAirlineBusiness,
};
