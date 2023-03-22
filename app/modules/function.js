const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

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


function tokenGenerator(payload = {}) {
    console.log(payload);
    const token = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: "365 days"})
    return token
}

function VerifyJWTToken(token) {
    const result = jwt.verify(token, process.env.SECRET_KEY)
    const authLog = {
        status: 401,
        success: false,
        message: "لطفا وارد حساب کاربری خود شوید"
    }

    if (!result?.username)
    throw authLog;

    return result;

}

module.exports = {
    expressValidatorMapper,
    hashString,
    tokenGenerator,
    VerifyJWTToken
}
