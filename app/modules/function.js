const bcrypt = require('bcrypt');

function expressValidatorMapper(error =[]) {

    let result = {}

    error.forEach(err => {

        result[err.param] = err.msg;

    })

    return result;
}

function hashString(input) {

    const salt = bcrypt.genSaltSync(10);

    return bcrypt.hashSync(input, salt);

}


module.exports = {
    expressValidatorMapper,
    hashString
}
