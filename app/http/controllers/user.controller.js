class UserController {

    getProfile(req, res, next) {

        try {

            const user = req.user;

            res.status(200).json({status: 200, success: true, user})

        } catch (error) {
            return  next(error)
        }
        
    }

    editProfile() {}

    addSkills() {}

    editSkills() {}

    acceptInviteInTeam() {}

    rejectInviteInTeam() {}
}

module.exports = {
    userController: new UserController()
}
