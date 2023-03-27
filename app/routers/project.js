const {projectController} = require('../http/controllers/project.controller');
const {checkLogin} = require('../http/middlewares/autoLogin');
const {express_Middleware_ValidatorMapper} = require('../http/middlewares/checkError');
const {createProjectValidator} = require('../http/validations/project');
const {MongoIdValidator} = require('../http/validations/public');
const {uploadFile} = require('../modules/expressFileUpload');
const fileUpload = require('express-fileupload');
const router = require('express').Router();

router.post("/create-project", fileUpload(), checkLogin, uploadFile, createProjectValidator(), express_Middleware_ValidatorMapper, projectController.createProject)
router.get("/list", checkLogin, projectController.getAllProject)


const getProjectById = (req,res,next) => projectController.getProjectById(req, res, next);


router.get("/:id", checkLogin, MongoIdValidator(), express_Middleware_ValidatorMapper,getProjectById )


router.delete("/remove/:id", checkLogin, MongoIdValidator(), express_Middleware_ValidatorMapper, projectController.removeProject)
router.put("/edit/:id", checkLogin, MongoIdValidator(), express_Middleware_ValidatorMapper, projectController.updateProject)

router.patch("/edit-Profile-image/:id",fileUpload(), checkLogin,uploadFile, MongoIdValidator(), express_Middleware_ValidatorMapper, projectController.updateProjectImage)
module.exports = {
    projectRouter: router
}
