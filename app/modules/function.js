function expressValidatorMapper(error =[]) {

    let result = {}
 
    error.forEach(err => {

        result[err.param] = err.msg;

    })

    return result;
}


module.exports = {
    expressValidatorMapper
}