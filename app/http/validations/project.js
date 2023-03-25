const { body } = require("express-validator");

function createProjectValidator(){

    return [

        body("title").notEmpty().withMessage("عنوان خالی نمی تواند باشد"),
        body("text").notEmpty().isLength({min : 20}).withMessage("توضیحات باید حد اقل 20 کاراکتر باشد"),
        body("tags").isArray({min:0,max : 10}).withMessage("حد اکثر 10 برچسب میتوان استفاده کرد")

    ]

}

module.exports = {
    createProjectValidator
}