const {userModel} = require("../../models/user");
const {VerifyJWTToken} = require("../../modules/function");


const checkLogin = async (req, res, next) => {

    try {
     
        const authorization = req ?. headers ?. authorization;

        const authLog = {
            status: 401,
            success: false,
            message: "لطفا وارد حساب کاربری خود شوید"


        }

        if (! authorization) 
            throw authLog;
        

  

        let token = authorization.split(" ") ?. [1];
        if (! token) 
            throw authLog;
        
  

        const result = VerifyJWTToken(token)
        const {username} = result;
        const user = await userModel.findOne({
            username
        }, {password: 0,token : 0})
        console.log(result);
        if (! user) 
            throw authLog;
        

        req.user = user;

        return next();
    } catch (error) {
        return  next(error)
    }

}

module.exports = {

    checkLogin
}