const getUsers = require('../adminServices/getusers')
const { level } = require("winston");
const logger = require("../logger/logger");
const userSchema = require('../schema/userschema');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const secretKey = process.env.TOKEN_KEY;

exports.getUsers = async function(req, res, next){

    await getUsers.getUsers()
    .then((result) => {
      logger.log({level:'info', message: 'User found'})
      return res.status(200).send(result);
    })
    .catch((error) => {
      next(error)
    })

}; // getUser
