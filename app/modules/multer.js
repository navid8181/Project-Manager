const multer = require('multer');
const {createUploadPathDirectory} = require('./function');
const path = require('path');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, createUploadPathDirectory());
    },
    filename: (req, file, cb) => {
   
        const exeName = path.extname(file.originalname);

        cb(null, Date.now() + exeName);

    }

})

const upload_multer = multer({storage})

module.exports = {
    upload_multer
}
