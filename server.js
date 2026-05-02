require("dotenv").config()
const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./router")
const pool = require("./db")
const errorHandler = require("./middlewares/errorHandler")

app.use(cors({
    origin: process.env.FRONTEND_URL,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    next();
});
app.use("/task", router);
app.use((req, res, next) => {
    const err = new Error("Route not found");
    err.status = 404;
    next(err);
});
app.use(errorHandler);

const PORT = process.env.BACKEND_PORT || 3000;
app.listen(PORT);