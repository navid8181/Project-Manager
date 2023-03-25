const {param} = require("express-validator");

function MongoIdValidator() {

    return [param('id').isMongoId().withMessage("شناسه مورد نظر صحیح نمیباشد")]


}

module.exports = {
    MongoIdValidator
}