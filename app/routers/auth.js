const { validationResult } = require('express-validator');
const { authController } = require('../http/controllers/auth');
const { registerValidator } = require('../http/validations/auth');

const router = require('express').Router();

router.post('/register',registerValidator(),authController.register,(req,res,next)=>{
    
 

})

module.exports = {
    athRouter : router
}

