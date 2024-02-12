const { createNotification } = require("../services/email-service");

const create = async (req, res) => {
    try {
        const response = await createNotification(req.body);
        return res.status(201).json({
            success: true,
            data: response,
            err: null,
            message: "Notification created successfully",
        });
    } catch (error) {
        return res.status(error.statusCode).json({
            success: false,
            data: null,
            err: error,
            message: error.message,
        });
    }
};

module.exports = {
    create,
};
