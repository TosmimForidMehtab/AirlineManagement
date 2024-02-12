const axios = require("axios");
const checkUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const reponse = await axios.get("http://localhost:5001/authservice/api/v1/isAuthenticated", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (reponse.data.success) {
            next();
        }
        else {
            return res.status(401).json({success: false, message: "Unauthorized"});
        }

    } catch (error) {
        return res.status(401).json({success: false, message: "Unauthorized"});
    }
};

module.exports = {
    checkUser
};