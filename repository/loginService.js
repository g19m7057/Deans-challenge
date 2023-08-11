const {getUser} = require('./getService');
const bcrypt = require('bcrypt');

async function loginUser(email, password){

    const user = await getUser(email)
    .catch((error) => {
        throw error;
    })

    await bcrypt.compare(password, user.password)
    .then((result) => {
        if(result){
            return
        }
        else{
            let error = new Error('Error cant login')
            error.statusCode = 404;
            throw error;
        }
    })
}

module.exports = { loginUser }

