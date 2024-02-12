const express = require("express");
const cors = require("cors");

const { PORT } = require("./config/serverConfig");
const apiRoutes = require("./routes/index");
const db = require("./models/index");
const app = express();

const setupAndStartServer = async () => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());

    app.use("/bookingservice/api", apiRoutes);
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
        // if (process.env.DB_SYNC) {
        //     db.sequelize.sync({ alter: true });
        // }
    });
};

setupAndStartServer();
