const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const bouquetsRouter = require("./routes/api/bouquets");
const ordersRouter = require("./routes/api/orders");
const consultationsRouter = require("./routes/api/consultations");
const authRouter = require("./routes/api/auth");
// const checkoutRouter = require("./routes/api/checkout");

dotenv.config();

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/bouquets", bouquetsRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/consultations", consultationsRouter);
app.use("/api/auth", authRouter);
// app.use("/api/checkout", checkoutRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
