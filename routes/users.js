const express = require('express');
const router = express.Router();
const logger = require('../logger/logger');
const userSchema = require('../schema/userschema')

// allow form json req to be parsed
router.use(express.urlencoded({extended:true}));
router.use(express.json()) // this allows us to parse JSON files from the body

let users = [];
// saves here for now

function validateUser(req, res, next){
    const {error, value } = userSchema.validate(req.body);
    if(error){
        logger.log({level:'error', message:`Error: ${error}`});
        return res.status(409).send(error.details[0].message);
    }
    next()
}

function saveUser(req, res, next){
    if(userExists(req.body)){
        logger.log({level:'error', message:`User with email address ${req.body.email} already exists`});
        return res.send(`User with email address ${req.body.email} already exists`);
    }
    users.push({firstname: req.body.firstname, lastname: req.body.lastname, email_adress: req.body.email});
    next();
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

router.route('/users/createUser')
.post(validateUser, saveUser, (req, res) => { 
    logger.log({level: 'info', message:`Successfully created user ${req.body.firstname}`});
    res.send(`${req.body.firstname} saved`); // if it comes back from both middleware
    console.log(users);
});

module.exports = router;