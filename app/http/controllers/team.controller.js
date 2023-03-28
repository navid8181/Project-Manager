const { teamModel } = require("../../models/team");

class TeamController {

   async createTeam(req,res,next) {

        try {

            const {name,username,description} = req.body;
            const owner = req.user._id
            
            const teamResult = await teamModel.create({description,name,username,owner});

            if (!teamResult)
            throw {
                status : 500,
                message : "ایجاد تیم با مشکل مواجه شد"
            }

            res.json( {
                status : 200,
                Success : true,
                message : "ایجاد تیم با موفقیت انجام شد"
            })

        } catch (error) {
            next(error)
        }


    }

   async getList(req,res,next){

        try {

            const teamResult = await teamModel.find({});

            res.json({
                status : 200,
                teamResult
            })

        } catch (error) {
            next(error)
        }

    }

    inviteUSerToTeam() {}

    removeTeamById() {}

    updateTeam() {}


}

module.exports = {
    teamController : new TeamController()
}
