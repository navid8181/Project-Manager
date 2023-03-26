
const {projectModel} = require("../../models/project");
const autoBind = require('auto-bind');
class ProjectController {

    constructor() {

       autoBind(this)

    }

    async createProject(req, res, next) {

        try {


            const {title, text, image, tags} = req.body;

            const owner = req.user._id

            const result = await projectModel.create({
                text,
                title,
                owner,
                image,
                tags
            });

            if (! result) 
                throw {
                    status : 400,
                    Success : false,
                    message : "پروژه ذخیره نشد"
                }
            


            res.status(201).json({status: 201, Success: true, message: "پروژه ذخیره شد"})

        } catch (error) {
            next(error)
        }

    }


    async getAllProject(req, res, next) {

        try {

            const owner = req.user._id;

            const projects = await projectModel.find({owner});

            res.status(200).json({status: 200, Success: true, projects})


        } catch (error) {
            next(error)
        }

    }

    async findProject(owner, projectID) {


        const project = await projectModel.find({owner, _id: projectID})

        if (! project) 
            throw {
                status : 400,
                message : "پروژه ای یافت نشد"
            }
        


        return project
    }

    async getProjectById(req, res, next) {

        try {

            const owner = req.user._id;
            const projectID = req.params.id;
            console.log(this);


            const project = await this.findProject(owner, projectID)


            res.json({status: 200, Success: true, project})
        } catch (error) {
            next(error)
        }


    }

    getProjectOfTeam() {}

    getProjectOfUser() {}

    updateProject() {}

    async removeProject(req, res, next) {


        try {
            const owner = req.user._id;
            const projectID = req.params.id;

            await this.findProject(owner, projectID)

            const result = await projectModel.deleteOne({_id: projectID})

            if (result.deletedCount == 0) 
                throw {
                    status : 400,
                    message : "پروژه حذف نشد"
                }
            


            res.status(200).json({status: 200, Success: true, message: "پروژه با موفقیت حذف شد"})

        } catch (error) {
            next(error)
        }


    }


}

module.exports = {
    projectController: new ProjectController()
}
