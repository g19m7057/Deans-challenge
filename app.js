const express = require("express");
const app = express();
const users = require("./routes/users");

// hide header information
const helment = require("helmet");
app.use(helment());

app.use("/", users);

app.get("/", (req, res) => {
  res.send("Home page");
});

module.exports = app;
