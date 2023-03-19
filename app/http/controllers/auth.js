const { validationResult } = require("express-validator");
const { expressValidatorMapper } = require("../../modules/function");



class AuthController{

    register(req,res,next){

        const {username,password,email,mobile} = req.body;
        console.log(req.body);
        const result = validationResult (req);


        if (result?.errors?.length >0){
            const messages = expressValidatorMapper(result.errors);
            return res.status(400).json(messages)
        }

        return res.json(result)
    }

    login(){

    }

    resetPassword(){
        
    }


}

module.exports = {
    authController : new AuthController()
}