const fileUpload = require('express-fileupload');

const path = require('path');
const {createUploadPathDirectory} = require('./function');

const uploadFile = async (req, res, next) => {

    try {


        if (!req.files || Object.keys(req.files).length == 0) 
            throw {
                status : 400,
                Success : false,
                message : "هیج فایلی انتخاب نشده است"
            }
        


        const image = req.files.image;

        const imagePath = path.join(createUploadPathDirectory(), Date.now()+path.extname(image.name))
            req.body.image = imagePath
        const uploadPath = path.join(__dirname, "..", "..", imagePath)
        image.mv(uploadPath, (err) => {
            if (err) 
                next(err)


            


            next()
        })


    } catch (error) {
        next(error)
    }


}

module.exports = {
    uploadFile
}
