const crypto = require('crypto');
const userDB = require('../schema/dbSchema');

const logger = require("../logger/logger");

async function userExists(email) {

    try {

        let user = await userDB.findOne({email_address: email})
        .catch((error) => {
            return error
        })

        if (user) {
            logger.log({level:'error', message:'User exists'});
            return true;
        } else {
            return false;
        }
    } catch (err) {
        logger.log({level:'error', message:err});
    } 
}; // userExists

function generateUserId(email) {
    const hash = crypto.createHash('md5').update(email).digest('hex');
    return hash;
}
  
module.exports = {
    userExists,
    generateUserId,
}