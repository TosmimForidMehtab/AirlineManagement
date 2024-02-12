require("dotenv").config();
const express = require("express");
const { PORT } = require("./config/serverConfig");
const ApiRoutes = require("./routes");
const { setupJob } = require("./utils/job");
const { subscribeMessage, createChannel } = require("./utils/messageQueue");
const { subscribeEvents } = require("./services/email-service");
const startServer = () => {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use("/api", ApiRoutes);

    app.listen(PORT, async () => {
        console.log(`Server started on port ${PORT}`);
        // sendBasicEmail("tosmimf@gmail.com", "Test", "Test");
        const channel = await createChannel();
        subscribeMessage(channel, subscribeEvents, process.env.REMINDER_BINDING_KEY);
        setupJob();
    });
};

startServer();
