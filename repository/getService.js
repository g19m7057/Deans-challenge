const logger = require("../logger/logger");
const userDB = require('../schema/dbSchema');


async function getUser(email){

    let result = await userDB.findOne({email_address: email})
    .catch((error) => {
        throw error;
    })

    if(result){
        return result;
    }
    
    if(!result){
        let error = new Error();
        error.statusCode = 404;
        error.message = `Error: User not found in DB` 
        throw error;
    }
}

module.exports ={
    getUser,
}