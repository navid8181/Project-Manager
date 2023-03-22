const {body} = require('express-validator');
const {userModel} = require('../../models/user');

function registerValidator() {

    return [
        body('username').custom(async (value, ctx) => {

            if (value) {

                const userNameRegex = /^[a-z]+[a-z0-9\.\_]{2,}/gi

                const result = value.match(userNameRegex)


                if (result[0] === value) {

                    const queryResult = await userModel.find({username: value})

                    if (queryResult.length == 0) {
                        return true;

                    }
                    throw "نام کاربری  تکراری است"
                }
                throw "نام کاربری صحیح نیست"

            }
            throw "نام کاربری نمی تواند خالی باشد"

        }),
        body('email').isEmail().withMessage("ایمیل وارد شده صحیح نمی باشد").custom(async email => {

            const queryResult = await userModel.find({email})

            if (queryResult.length == 0) 
                return true;
            

            throw "ایمیل وارد شده قبلا استفاده شده است"


        }),
        body("mobile").isMobilePhone('fa-IR').withMessage('شماره موبایل صحیح نمی باشد').custom(async mobile => {

            const queryResult = await userModel.find({mobile})

            if (queryResult.length == 0) 
                return true;
            

            throw "موبایل وارد شده قبلا استفاده شده است"


        }),
        body("password").isLength(
            {min: 6, max: 16}
        ).withMessage("رمز عبور باید بین 6 و 16 باشد").custom(
            (value, ctx) => {

                if (!value) 
                    throw "رمز عبور نمی تواند خالی باشد"


                


                // console.log(value !== ctx ?. req ?. body ?. confirm_password);

                if (value !== ctx ?. req ?. body ?. confirm_password) {

                    throw "رمز عبور با تکرار آن یکسان نیست"
                }


                return true;


            }
        )

    ]

}

function loginValidator() {
 
    return [
        body('username').custom(async (value, ctx) => {

            if (value) {

                const userNameRegex = /^[a-z]+[a-z0-9\.\_]{2,}/gi

                const result = value.match(userNameRegex)


                if (result[0] === value) {


                    return true;
                }
                throw "نام کاربری صحیح نیست"

            }
            throw "نام کاربری نمی تواند خالی باشد"

        }),

        body("password").isLength(
            {min: 6, max: 16}
        ).withMessage("رمز عبور باید بین 6 و 16 باشد").custom(
            (value, ctx) => {

                if (!value) 
                    throw "نام کاربری نمی تواند خالی باشد"


                return true;


            }
        )
    ]
}
module.exports = {
    registerValidator,
    loginValidator
}
