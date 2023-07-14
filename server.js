const app = require("./app");

require("dotenv").config();

const port = process.env.DEV_PORT || 4000;

const logger = require("./logger/logger");

app.listen(port, (err) => {
  if (err) {
    logger.log({
      level: "error",
      message: `Could not connect to port ${port}`,
    });
    res.status(500).send(`could not connect to port ${port}`);
  }
  logger.log({
    level: "info",
    message: `Successfully connected to port ${port}`,
  });
});

// log to file instead with winston logger
