const {projectModel} = require("../../models/project");
const autoBind = require('auto-bind');
const { createLinkPath } = require("../../modules/function");
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
         //   console.log(this);


            const project = await this.findProject(owner, projectID)

           // console.log(project);

            res.json({status: 200, Success: true, project})
        } catch (error) {
            next(error)
        }


    }

    getProjectOfTeam() {}

    getProjectOfUser() {}

    async updateProject(req, res, next) {

        const owner = req.user._id;

        const projectId = req.params.id;


        const project = await this.findProject(owner, projectId);

        const data = {
            ...req.body
        }

        Object.entries(data).forEach(([key, value]) => {

            const validKey = ["title", "text", "tags"]
            const invalidValue = [
                null,
                NaN,
                -1,
                undefined,
                0,
                "",
                " "
            ]

            if (! validKey.includes(key)) 
                delete data[key]

            

            if (invalidValue.includes(value)) 
                delete data[key]


            


            if (key == "tags" && Array.isArray(data[key])) {

                data[key] = data[key].filter(value => {
                   // console.log(value);
                    if (! invalidValue.includes(value)) 
                        return value;
                    

                })

            }

        })


        const updateResult = await projectModel.updateOne({
            _id: projectId
        }, {$set: data})

        if (updateResult.modifiedCount == 0) 
            throw {
                status : 400,
                Success : false,
                message : "بروزرسانی انجام نشد"
            }
        


        res.status(200).json({status: 200, Success: true, message: "بروزرسانی  با موقیت انجام شد "})
    }

    async updateProjectImage(req, res, next) {

        try {
           
            const {image} = req.body;
            console.log(image);
             const newImage  = createLinkPath(image,req);
           console.log(newImage);
            const owner = req.user._id;
            const projectID = req.params.id;

            await this.findProject(owner, projectID)


            const updateResult = await projectModel.updateOne({
                _id: projectID
            }, {
                $set: {
                    image : newImage
                }})

                
            if (updateResult.modifiedCount == 0) 
                throw {
                    status : 400,
                    Success : false,
                    message : "بروزرسانی انجام نشد",
                    
                }
            

            res.status(200).json({status: 200, Success: true, message: "بروزرسانی  با موقیت انجام شد "})
        } catch (error) {
            next(error)
        }

    }

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
