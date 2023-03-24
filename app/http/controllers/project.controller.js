class ProjectController {


    createProject(req,res,next) {

        try {
            
            const  {title,text} = req.body;

            

        } catch (error) {
            next(error)
        }

    }


    getAllProject() {}

    getProjectById() {}

    getProjectOfTeam() {}

    getProjectOfUser() {}

    updateProject() {}

    removeProject() {}


}

module.exports = {
    projectController : new ProjectController()
}
