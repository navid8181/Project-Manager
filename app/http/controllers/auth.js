const {validationResult} = require("express-validator");
const {expressValidatorMapper, hashString, tokenGenerator} = require("../../modules/function");
const {userModel} = require("../../models/user");
const bcrypt = require('bcrypt');

class AuthController {

    async register(req, res, next) {
        try {
            const {username, password, email, mobile} = req.body;

            const hashPassword = hashString(password)

            const result = await userModel.create({username, mobile, email, password: hashPassword})
            res.json({status: 200, message: "اکانت شما ریجیستر شد"})
        } catch (error) {
           return next(error)
        }
    }

    async login(req, res, next) {
        console.log(req.headers);
        try {
            const {username, password} = req.body;

            const user = await userModel.findOne({username})

            if (! user) 
                throw {
                    status : 401,
                    success : false,
                    message : " نام کاربری یا رمز عبور صحیح نیست"
                }
            


            const compareResult = bcrypt.compareSync(password, user.password);

            if (! compareResult) 
                throw {
                    status : 401,
                    success : false,
                    message : " نام کاربری یا رمز عبور صحیح نیست"
                }
                
                const token  ="Bearer " + tokenGenerator({username})

                user.token = token;
                await user.save();

                res.json({
                    
                        status : 200,
                        success : true,
                        message : "شما به اکانت خود وارد شدید",
                        token :token
                    
                
                })

        } catch (error) {

            return next(error)
        }


    }

    resetPassword() {}


}

module.exports = {
    authController: new AuthController()
}
