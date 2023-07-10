const express = require('express');
const router = express.Router();
const logger = require('../logger/logger');
const userControllers = require('../controllers/users.controllers')

// allow form json req to be parsed
router.use(express.urlencoded({extended:true}));
router.use(express.json()) // this allows us to parse JSON files from the body

// saves here for now

router.use((req, res, next) =>
{
    logger.log({level:'info', message: `${req.method} ${req.path}`});
    next()
})

router.route('/users/createUser')
.post(userControllers.saveUser,  (req, res) => { 
    logger.log({level: 'info', message:`Successfully created user ID: ${userControllers.users.length}`});
    res.json({'success': true, 'id': userControllers.users.length});
    console.log(userControllers.users);
});

router.use((error, req, res, next) => {
    res.json({'success': 'false', 'error':error.message})
    logger.log({level:'error', message:`Error: ${error.message}`});
})

module.exports = router;