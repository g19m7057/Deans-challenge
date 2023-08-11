const express = require("express");
const router = express.Router();
const logger = require("../logger/logger");
const adminControllers = require("../controllers/admin.controllers");

const { authenticateToken } = require('../controllers/auth.controllers')

router.get('/admin/getUsers', authenticateToken, adminControllers.getUsers)

module.exports = router;