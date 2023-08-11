const logger = require("../logger/logger");
const userDB = require('../schema/dbSchema');

async function updateUser(req){
    const { email_add } = req.params;

    const {username, password, email} = req.body;
    const userData = {};
    if (username || username != undefined || username != null) { userData.username = username };
    if (password || password != undefined || password != null) { userData.password = password };
    if (email || email != undefined || email !== null) { userData.email_address = email };
    
    
    let user = await userDB.updateOne({email_address: email_add}, userData)
    .catch((error) => {
        error.message = `Server Error ${error}`;
        error.statusCode = 500;
        return next(error);
    })

    return user;
}

module.exports = {
    updateUser
}