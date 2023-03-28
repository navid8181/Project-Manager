const {teamController} = require('../http/controllers/team.controller');
const { checkLogin } = require('../http/middlewares/autoLogin');
const { express_Middleware_ValidatorMapper } = require('../http/middlewares/checkError');
const { createTeamValidator } = require('../http/validations/team');

const router = require('express').Router();


    router.post("/create",checkLogin,createTeamValidator(),express_Middleware_ValidatorMapper,teamController.createTeam)
    router.get("/list",checkLogin,teamController.getList)


module.exports = {
    teamRouter : router
}

