const logger = require("../logger/logger");
const userDB = require('../schema/dbSchema');

async function deleteUser(email){
    
    let result = await userDB.deleteOne({ email_address: email })
    .catch((error) =>{
        throw error;
    })

    if(result.deletedCount === 0){
        let error = new Error();
        error.statusCode = 404;
        error.message = 'No documents matched the query. Deleted 0 documents';
        throw error;
    }
    return result;
}

module.exports = {deleteUser};