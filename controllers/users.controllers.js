const logger = require("../logger/logger");
const userSchema = require('../schema/userschema')

let users = [];

exports.validateUser = function (req, res, next) {
  const { error, value } = userSchema.validate(req.body);

  if(error.details[0].message){
    logger.log({ level: "error", message: `Error: ${error.details[0].message}` });
    return res.json({ success: false, error: error.details[0].message });
  }
  next()
};

exports.saveUser = function (error, req, res, next) {

  if (!userExists(req.body)) {
    users.push({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email_adress: req.body.email,
    });

    return next();
  }

  error.message = "user already exists";
  next(error);
};

function userExists(newUser) {
  // check by email if user exists
  for (let i = 0; i < users.length; i++) {
    if (users[i].email_adress === newUser.email) {
      return true;
    }
  }
  return false;
}

exports.users = users;
