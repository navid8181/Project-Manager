const { validationResult } = require("express-validator");
const { expressValidatorMapper, hashString } = require("../../modules/function");
const { userModel } = require("../../models/user");



class AuthController{

    async register (req,res,next){

        const  {username,password,email,mobile} = req.body;

        const hashPassword = hashString(password)
        
       const result = await  userModel.create({username,mobile,email,password :hashPassword})
        res.json("result")
    }

    login(){

    }

    resetPassword(){
        
    }


}

module.exports = {
    authController : new AuthController()
}