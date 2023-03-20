const { validationResult } = require('express-validator');
const { authController } = require('../http/controllers/auth');
const { registerValidator } = require('../http/validations/auth');
const { express_Middleware_ValidatorMapper } = require('../http/middlewares/checkError');

const router = require('express').Router();

router.post('/register',registerValidator(),express_Middleware_ValidatorMapper,authController.register,(req,res,next)=>{
    


})

module.exports = {
    athRouter : router
}

