const express = require("express");
const cors = require("cors");
const { PORT } = require("./config/serverConfig");
const ApiRoutes = require("./routes/index");
// const db = require("./models/index");
// const { Airport, City } = require("./models/index");

const setupAndStartServer = async () => {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // app.get("/flightservice", (req, res) => {
    //     res.send("Hitting Flight Server");
    // });

    app.use("/flightservice/api", ApiRoutes);

    app.listen(PORT, async () => {
        console.log(`Server running on port ${PORT}`);
        /* if (process.env.SYNC_DB === "true") {
			await db.sequelize.sync({ alter: true });
		} */
        /* const city = await City.findOne({
			where: {
				id: 6,
			},
		});
		const airports = await city.getAirports();
		console.log(airports); */
    });
};

setupAndStartServer();
