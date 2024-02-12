const express = require("express");
const app = express();
const { PORT } = require("./config/serverConfig");
const apiRoutes = require("./routes/index");
const { sequelize, User, Role } = require("./models/index");

const startServer = () => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use("/authservice/api", apiRoutes);
    app.listen(PORT, async () => {
        console.log(`Server is running on port ${PORT}`);
        // if (process.env.DB_SYNC) {
        //     sequelize.sync({ alter: true });
        // }
    });
};

startServer();
