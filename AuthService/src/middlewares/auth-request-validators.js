const validateUserAuth = (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Please provide email and password",
            data: {},
            success: false,
            err: {},
        });
    }
    next();
};

const validateIsAdminRequest = (req, res, next) => {
    if (!req.body.id) {
        return res.status(400).json({
            message: "Please provide user id",
            data: {},
            success: false,
            err: {},
        });
    }
    next();
};

module.exports = {
    validateUserAuth,
    validateIsAdminRequest,
};
