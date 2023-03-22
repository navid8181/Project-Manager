const { validationResult } = require("express-validator");
const { expressValidatorMapper } = require("../../modules/function");



 function express_Middleware_ValidatorMapper (req,res,next){

    //const {username,password,email,mobile} = req.body;
  //  console.log(req.body);
    const result = validationResult (req);



    if (result?.errors?.length >0){
  
        const messages = expressValidatorMapper(result.errors);
        return res.status(400).json({

            status : 400,
            success : false,
            messages
        })
    }
   
    return next();

}

module.exports = {
    express_Middleware_ValidatorMapper
}