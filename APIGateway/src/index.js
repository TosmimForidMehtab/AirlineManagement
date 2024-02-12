const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const {createProxyMiddleware} = require("http-proxy-middleware");
const {PORT, WINDOW, LIMIT} = require("./config/serverConfig");
const {checkUser} = require("./middlewares/auth-user");
const app = express();

const limiter = rateLimit({
    windowMs: WINDOW * 60 * 1000,
    max: LIMIT,
});

app.use(morgan("dev"));
app.use(limiter);


app.use("/authservice", createProxyMiddleware({target: "http://localhost:5001", changeOrigin: true}));

app.use("/bookingservice", checkUser, createProxyMiddleware({target: "http://localhost:5002", changeOrigin: true}));

app.use("/flightservice", checkUser, createProxyMiddleware({target: "http://localhost:5000", changeOrigin: true}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});