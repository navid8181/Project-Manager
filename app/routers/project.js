const {projectController} = require('../http/controllers/project.controller');

const router = require('express').Router();

router.post("/create-Project",projectController.createProject)

module.exports = {
    projectRouter : router
}

