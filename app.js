const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const routes = require("./routes/api");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.static("public"));

app.use("/api/users", routes.authRouter);
app.use("/api/contacts", routes.contactRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server Error" } = err;
  res.status(status).json({ message });
});
app.use(errorHandler);

module.exports = app;
