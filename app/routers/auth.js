const { validationResult } = require('express-validator');
const { authController } = require('../http/controllers/auth');
const { registerValidator,loginValidator } = require('../http/validations/auth');
const { express_Middleware_ValidatorMapper } = require('../http/middlewares/checkError');

const router = require('express').Router();

router.post('/register',registerValidator(),express_Middleware_ValidatorMapper,authController.register)
router.post('/login',loginValidator(),express_Middleware_ValidatorMapper,authController.login)

module.exports = {
    athRouter : router
}

