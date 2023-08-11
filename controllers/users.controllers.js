const { level } = require("winston");
const logger = require("../logger/logger");
const userSchema = require('../schema/userschema');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const secretKey = process.env.TOKEN_KEY;

const loginService = require('../repository/loginService')

exports.loginUser = async function(req, res, next){
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
    const token = jwt.sign({ username, email }, secretKey, { expiresIn: '1h' });
    logger.log({level: 'info', message: 'Successfully logged in'});
    return res.status(201).json({'success': true, 'message': 'Successfully logged in', token:token})
  })
  .catch((error) => {
    logger.log({ level: "error", message: error.message });
    return res.status(error.statusCode || 500).json({ success: false, message: error.message});
  })
 }

const saveUserService = require('../repository/saveService')

exports.saveUser = async function(req, res, next){
  console.log(req.body)
  const { error, value } = userSchema.validate(req.body);
  
  if(error){
    logger.log({ level: "error", message: `Error: ${error.details[0].message}` });
    return res.status(400).json({ success: false, error: error.details[0].message });
  }
  
  await saveUserService.saveUser(req)
  .then((result) =>{
    logger.log({level: 'info', message:`Successfully created user ID: ${result._id}`});
    return res.status(201).json({'success': true, 'id': `ID: ${result._id}`});
  })
  .catch((error) => {
    logger.log({ level: "error", message: `Error: ${error.message}` });
    return res.status(409).json({ success: false, error: error.message });
 
  })
}

const getUserService = require('../repository/getService');

exports.getUser = async function(req, res, next){

    await getUserService.getUser(req.params.email)
    .then((result) => {
      logger.log({level:'info', message: 'User found'})
      return res.status(200).send(result);
    })
    .catch((error) => {
      next(error)
    })

}; // getUser


const updateUserService = require('../repository/updateService');

exports.updateUser = async function(req, res, next){
  
  let user = await updateUserService.updateUser(req)
  if(user.matchedCount === 0){
    let error = new Error();
    error.message = `${req.params.email_add} not found`;
    error.statusCode = 404;
    return next(error)
  }

  if(user.modifiedCount === 0){
    let error = new Error;
    error.message = `Cannot update document for ${req.params.email_add}`;
    error.statusCode = 404;
    return next(error)
  }
  logger.log({level:'info', message: `User ${req.params.email_add}  updated`})
  return res.status(200).json(`User ${req.params.email_add} was updated`);
}; // updateUser 

const deleteUserService = require('../repository/deleteService')

exports.deleteUser = async function(req, res, next){
  const email = req.params.email;
  await deleteUserService.deleteUser(email)
  .then((result) => {
    logger.log({level:'info', message: `User ${email} deleted`})
    return res.status(200).json(`User ${email} was deleted`);
  })
  .catch((error) => {
    return next(error)
  })
}