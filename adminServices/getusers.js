const logger = require("../logger/logger");
const userDB = require('../schema/dbSchema');


async function getUsers(email){

    let result = await userDB.find()
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
    getUsers,
}