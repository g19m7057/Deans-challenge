const express = require("express");
const router = express.Router();
const logger = require("../logger/logger");
const userControllers = require("../controllers/users.controllers");

const {authenticateToken,
  generateToken} = require('../controllers/auth.controllers')

// allow form json req to be parsed
router.use(express.urlencoded({ extended: true }));
router.use(express.json()); // this allows us to parse JSON files from the body

router.use((req, res, next) => {
  logger.log({ level: "info", message: `${req.method} ${req.path}` });
  next();
});

router.route('/users/createUser')
.post( userControllers.validateUser, userControllers.saveUser, generateToken, (req, res) => { 
    logger.log({level: 'info', message:`Successfully created user ID: ${userControllers.count}`});
    res.status(201).send({'success': true, 'id': `ID: ${userControllers.count}`});
  });

router.route("/users/protected")
.post(authenticateToken, (req, res) => {
  res.send('Protected obtained');
})

router.use((error, req, res, next) => {
  res.status(error.status).json({ success: "false", error: error.message });
  logger.log({ level: "error", message: `Error: ${error.message}` });
});

module.exports = router;
