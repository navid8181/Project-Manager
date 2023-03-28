const {body} = require("express-validator");
const {teamModel} = require("../../models/team");


function createTeamValidator() {


    return [
        body("name").isLength(
            {min: 5}
        ).withMessage("نام باید حداقل 5 حرف داشته باشد"),
        body("description").notEmpty().withMessage("توضیحات نمیتواند خالی باشد"),

        body("username").custom(async username => {
         
            const userNameRegex = /^[a-z]+[a-z0-9\.\_]{2,}$/gim

            const result = userNameRegex.test(username)

            console.log(result);
            if (!result) 
                throw "نام کاربری صحیح نیست"

            

            const projectResult = await teamModel.findOne({username});

            if (projectResult) 
                throw "نام کاربری قبلا استفاده شده است"


            


            return true;

        })


    ]

}

module.exports = {
    createTeamValidator
}