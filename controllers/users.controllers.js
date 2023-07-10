let users = [];

exports.users = users;

exports.validateUser = function(req, res, next){
    const {error, value } = (userSchema.validate(req.body));
    // console.log(error.details[0].message);

    if(!error){
        return next()
    }
    logger.log({level:'error', message:`Error: ${error.details[0].message}`});
    res.json({'success':false, error:error.details[0].message});
}

exports.saveUser = function(error, req, res, next){

    if(!userExists(req.body)){
        users.push({firstname: req.body.firstname, lastname: req.body.lastname, email_adress: req.body.email});
        return next();
    }
    error.message = 'user already exists';
    next(error);
}   

function userExists(newUser){
    // check by email if user exists
    for(let i = 0; i < users.length; i++){
        if(users[i].email_adress === newUser.email){
            return true;
        }
    }
    return false;
}
