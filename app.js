const express = require("express");
const cors = require('cors');
const app = express();
const users = require("./routes/users");
const logger = require('./logger/logger')
require("dotenv").config();
require('./controllers/db.controllers')
const weather = require('./routes/weather')
const admin = require('./routes/admin')
const port = process.env.DEV_PORT || 4000;

app.use(cors())

// hide header information
const helmet = require("helmet");
app.use(helmet());

app.use((req, res, next) => {
  logger.log({ level: "info", message: `${req.method} ${req.path}` });
  next();
});

app.use('/', admin)
app.use("/", users);
app.use("/", weather);

app.listen(port, (err) => {
  if (err) {
    logger.log({
      level: "error", message: `Could not connect to port ${port}`});
      res.status(500).send(`could not connect to port ${port}`);
      process.exit(1);
  }
  logger.log({level: "info", message: `Successfully connected to port ${port}`});
});

