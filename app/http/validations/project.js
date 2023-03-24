const { body } = require("express-validator");

function createProjectValidator(){

    return [

        body("title").notEmpty().withMessage("عنوان خالی نمی تواند باشد"),
        body("text").notEmpty().isLength({min : 20}).withMessage("توضیحات باید حد اقل 20 کاراکتر باشد")


    ]

}

module.exports = {
    createProjectValidator
}