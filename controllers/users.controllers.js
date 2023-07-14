const { level } = require("winston");
const logger = require("../logger/logger");
const userSchema = require('../schema/userschema')
const { db, client } = require('./db.controllers')

exports.validateUser = function (req, res, next) {
  const { error, value } = userSchema.validate(req.body);

  if(error.details[0].message){
    logger.log({ level: "error", message: `Error: ${error.details[0].message}` });
    return res.json({ success: false, error: error.details[0].message });
  }
  next()
};

let collection = db.collection('users');

async function userExists(email) {

  try {

    const query =  email ;
    const user = await collection.findOne(query);

    if (user) {
      logger.log({level:'error', message:'User exists'});
      return true
    } else {
      return false;
    }
  } catch (err) {
    logger.log({level:'error', message:err});
  } 
}

async function getDocumentCount(){
  const count = await collection.countDocuments()
  .catch((error) => {logger.log({level:'error', message: error})})
  exports.count = count+1;
  return count;
}

let userID;

exports.saveUser = async function (error, req, res, next) {
  const userEmail =  {email_adress: req.body.email}; 
  userID = await getDocumentCount();
  if (await userExists(userEmail) === false) {
    
    let user = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email_adress: req.body.email,
      id: userID+1,
    }

    let res = await collection.insertOne(user)
    .catch((error) => { return next(err)} );
    return next();
  }

  error.message = "user already exists";
  error.status = 409;
  next(error);
};

exports.id = userID;