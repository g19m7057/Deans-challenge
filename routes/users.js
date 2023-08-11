const express = require("express");
const router = express.Router();
const logger = require("../logger/logger");
const userControllers = require("../controllers/users.controllers");

const { authenticateToken } = require('../controllers/auth.controllers')

// allow form json req to be parsed
router.use(express.urlencoded({ extended: true }));
router.use(express.json()); // this allows us to parse JSON files from the body

router.post('/users/loginUser', userControllers.loginUser)

router.post( '/users/createUser', userControllers.saveUser);

router.get('/users/getUser/:email', authenticateToken, userControllers.getUser)

router.patch('/users/updateUser/:email_add',authenticateToken ,userControllers.updateUser)

router.delete('/users/deleteUser/:email' ,authenticateToken ,userControllers.deleteUser)

router.use((error, req, res, next) => {
  res.status(error.statusCode || res.status || 500).json({ success: "false", error: error.message });
  logger.log({ level: "error", message: `Error: ${error.message}` });
});

module.exports = router;
