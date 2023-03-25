const { projectModel } = require("../../models/project");

class ProjectController {


   async createProject(req,res,next) {

        try {
       
            
            const  {title,text,image} = req.body;

            const owner = req.user._id

            const result =  await projectModel.create({text,title,owner,image});

            if (!result)
            throw {
                status : 400,
                Success : false,
                message : "پروژه ذخیره نشد"
            }


            res.status(201).json({
                status : 201,
                Success : true,
                message : "پروژه ذخیره شد"
            })

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
