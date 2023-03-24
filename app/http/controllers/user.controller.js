const {userModel} = require("../../models/user");

class UserController {

    getProfile(req, res, next) {

        try {

            const user = req.user;

            res.status(200).json({status: 200, success: true, user})

        } catch (error) {
            return next(error)
        }

    }

    async editProfile(req, res, next) {

        try {

            let data = req.body;

            let userId = req.user._id;

            const validData = ["first_name", "last_name", "skills"]
            const invalidData = [
                "",
                " ",
                NaN,
                null,
                -1,
                0
            ]

            Object.entries(data).forEach(([key, value]) => {

                if (! validData.includes(key)) 
                    delete data[key]


                


                if (invalidData.includes(data)) 
                    delete data[key]


                


            })

            const result = await userModel.updateOne({
                _id: userId
            }, {
                $set: {
                    ... data
                }
            })

            if (result.modifiedCount > 0) {
                return res.json({status: 200, Success: true, message: "پروفایل با موفقیت بروز رسانی شد"})
            }
            return res.json({status: 400, Success: true, message: "پروفایل با  بروز رسانی نشد"})
        } catch (error) {
            return next(error)
        }

    }

    async uploadProfileImage(req, res, next) {
        try {
     
            const userID = req.user._id;
            console.log();
            if (!req.file || Object.keys(req.file).length == 0) 
                throw {
                    status : 400,
                    message : "لطفا یک فایل انتخاب کنید"
                }
             

            const filePath = req.file ?. path.replaceAll("\\", "/").substring(7);
                const linkPath = req.protocol + "://"+ req.get("host") + "/" + filePath; 
                
            const result = await userModel.updateOne({
                _id: userID
            }, {
                $set: {
                    image_Profile: linkPath
                }
            })

            if (result.modifiedCount == 0) 
                throw {
                    status : 400,
                    message : "فایل بارگذاری نشد" 
                }
            
            res.json( {
                status : 200,
                message : "فایل بارگذاری شد" 
            })
        } catch (error) {
            next(error)
        }
    }
    addSkills() {}

    editSkills() {}

    acceptInviteInTeam() {}

    rejectInviteInTeam() {}
}

module.exports = {
    userController: new UserController()
}
