
const {projectController} = require('../http/controllers/project.controller');
const { checkLogin } = require('../http/middlewares/autoLogin');
const { express_Middleware_ValidatorMapper } = require('../http/middlewares/checkError');
const { createProjectValidator } = require('../http/validations/project');
const { uploadFile } = require('../modules/expressFileUpload');
const fileUpload = require('express-fileupload');
const router = require('express').Router();

router.post("/create-project",fileUpload(),checkLogin,uploadFile,createProjectValidator(),express_Middleware_ValidatorMapper,projectController.createProject)

module.exports = {
    projectRouter : router
}

