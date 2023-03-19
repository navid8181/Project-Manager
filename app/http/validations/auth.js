const {body} = require('express-validator');

function registerValidator() {

    return [
        body('username').custom(
            (value, ctx) => {

                if (value) {

                    const userNameRegex = /^[a-z]+[a-z0-9_.]{2,}/gi

                    if (userNameRegex.test(value)) {
                        return true;
                    }
                    throw "نام کاربری صحیح نیست"

                }
                throw "نام کاربری نمی تواند خالی باشد"

            }
        ),
        body('email').isEmail().withMessage("ایمیل وارد شده صحیح نمی باشد"),
        body("mobile").isMobilePhone('fa-IR').withMessage('شماره موبایل صحیح نمی باشد'),
        body("password").isLength(
            {min: 6, max: 16}
        ).withMessage("رمز عبور باید بین 6 و 16 باشد").custom(
            (value, ctx) => {

                if (!value) 
                    throw "نام کاربری نمی تواند خالی باشد"

                console.log(value !== ctx ?. req ?. body ?. confirm_password);

                if (value !== ctx ?. req ?. body ?. confirm_password) {

                    throw "رمز عبور با تکرار آن یکسان نیست"
                }
           

                return true;


            }
        )

    ]

}

module.exports = {
    registerValidator
}