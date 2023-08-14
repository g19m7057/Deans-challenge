const getUsers = require('../adminServices/getusers')
const { level } = require("winston");
const logger = require("../logger/logger");
const userSchema = require('../schema/userschema');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const secretKey = process.env.TOKEN_KEY;


exports.loginAdmin = async function(req, res, next){
  const { email, password, username } = req.body;

  if(!email){
    logger.log({ level: "error", message: `Error: Email is required` });
    return res.status(404).json({ success: false, message: 'Email is required'});
  }

  if(!password){
      logger.log({ level: "error", message: `Error: Password is required` });
      return res.status(404).json({ success: false, message: 'Password is required'});
  }

  await loginService.loginUser(email, password)
  .then(() => {
    const token = jwt.sign({ username, email, role:'admin' }, secretKey, { expiresIn: '1h' });
    logger.log({level: 'info', message: 'Admin successfully logged in'});
    return res.status(201).json({'success': true, 'message': 'Successfully logged in', token:token})
  })
  .catch((error) => {
    logger.log({ level: "error", message: error.message });
    return res.status(error.statusCode || 500).json({ success: false, message: error.message});
  })
 }

exports.getUsers = async function(req, res, next){

    await getUsers.getUsers()
    .then((result) => {
      logger.log({level:'info', message: 'Users found'})
      return res.status(200).send(result);
    })
    .catch((error) => {
      next(error)
    })

}; // getUser
