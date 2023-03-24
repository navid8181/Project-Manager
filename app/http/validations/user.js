const {body} = require("express-validator");
const path = require('path');

function imageValidator() {

    return [body('image').custom(
            (image, {req}) => {
               // console.log(req.file);
                if (Object.keys(req.file).length == 0) 
                    throw "لطفا یک  فایل را انتخاب کنید"

                

                const ext = path.extname(req.file.originalname)

                const validFormatFile = ['.png', '.jpg', '.jpeg', '.gif'];

                if (! validFormatFile.includes(ext)) 
                    throw "فرمت فایل صحیح نیست"

                    const maxSize = 2 * 1024 * 1024;

                    if (req.file.size > maxSize)
                    throw "حجم فایل بیش از حد مجاز است"
                
        

                    return true
            }
        )]

}

module.exports = {
    imageValidator
}
