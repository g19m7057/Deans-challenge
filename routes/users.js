const express = require('express');
const router = express.Router();
const Joi = require('joi');

// allow form json req to be parsed
router.use(express.urlencoded({extended:true}));
router.use(express.json()) // this allows us to parse JSON files from the body

let users = [];
// saves here for now

function saveUser(req, res, next){
    if(req.body !== undefined && req.body !== {} && checkUser(req.body)){
        //save the user after validating
        users.push({firstname: req.body.firstname, lastname: req.body.lastname, email_adress: req.body.email});
        return next();
    }
    res.send('user already exists')
}   

const userSchema = Joi.object({
    firstname: Joi.string().required,
    lastname: Joi.string().required,
    email: Joi.string().email().required,
})

function validateData(schema) {
    return  (req, res, next) => {
        const {error} = schema.validate(req.body);
        if(error){
        return res.status(400).json({ error: error.details[0].message });
        }
        next()
    }
}

function checkUser(newUser){
    // check by email if user exists
    for(let i = 0; i < users.length; i++){
        console.log(users.length)
        console.log(users[i])
        console.log(newUser)
        if(users[i].email_adress === newUser.email){
            return false;
            // return res.status(409).send('User already exists');
        }
    }
    return true;
}

router.route('/users/createUser')
.post( saveUser, (req, res) => { 
    // check whether user already exists
    // check if the req body is valid
     console.log(users);
    res.send('user has been created');
 });

router.route('/users/getUser/:id')
.get((req, res) => { res.send(`This is you name ${req.params.firstName} you email ${req.params.email}`)})

module.exports = router;