const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user.routes");
const bodyParser = require("body-parser");
const projectConfig = require("./config/config");

const { config, mongoDb } = projectConfig;

const app = express();
// mount routes
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use("/", userRoutes);

mongoose.connect(mongoDb, { useNewUrlParser: true });

// Once the connection is established, callback
mongoose.connection
  .once("open", () => {
    console.log("MongoDB database connection established successfully");
  })
  .on("error", (error) => {
    console.warn("Warning", error);
  });

app.listen(config.port, () => {
  console.log("Server is running on port " + config.port);
});
