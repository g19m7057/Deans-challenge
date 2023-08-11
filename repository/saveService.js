const userDB = require('../schema/dbSchema');
const {userExists} = require('../helpers/userHelpers');
const bcrypt = require('bcrypt');
const salt = 10;

async function saveUser(req){

    if(await userExists(req.body.email)){
        let error = new Error();
        error.message = "user already exists";
        error.statusCode = 409;
        throw error;
    }

    let hashedPass = await bcrypt.hash(req.body.password, salt)

    let user = {
      username:req.body.username,
      password: hashedPass,
      email_address: req.body.email,
    }

    const newUser = new userDB(user);
    return await newUser.save()
}


module.exports = {
    saveUser,
}