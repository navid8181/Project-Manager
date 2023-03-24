const {userController} = require('../http/controllers/user.controller');
const {checkLogin} = require('../http/middlewares/autoLogin');
const { express_Middleware_ValidatorMapper } = require('../http/middlewares/checkError');
const {imageValidator} = require('../http/validations/user');
const {upload_multer, fake_upload_multer} = require('../modules/multer');

const router = require('express').Router();


router.get("/profile", checkLogin, userController.getProfile)
router.post("/profile", checkLogin, userController.editProfile)

router.post("/profile_image",upload_multer.single("image"),imageValidator(), express_Middleware_ValidatorMapper,checkLogin, userController.uploadProfileImage)
module.exports = {
    userRouter: router
}
