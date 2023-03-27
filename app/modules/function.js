const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const fs = require('fs');
const path = require('path');

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
   // console.log(payload);
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

    if (! result ?. username) 
        throw authLog;
    


    return result;

}


function createUploadPathDirectory() {
    let d = new Date();

    const day = d.getDate();
    const month = d.getMonth();
    const year = d.getFullYear();

    const uploadPath = path.join(__dirname, "..", "..", "public", "upload", year.toString(), month.toString(), day.toString())
    fs.mkdirSync(uploadPath, {recursive: true})

    return path.join("public", "upload", year.toString(), month.toString(), day.toString());
}
// createUploadPathDirectory()

function createLinkPath(path,req) {
   
    const filePath = path.replaceAll("\\", "/").substring(7);
  
    const linkPath = req.protocol + "://"+ req.get("host") + "/" + filePath; 

    return linkPath
    
}

module.exports = {
    expressValidatorMapper,
    hashString,
    tokenGenerator,
    VerifyJWTToken,
    createUploadPathDirectory,
    createLinkPath
}
