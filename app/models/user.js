const mongoose = require('mongoose');


const userShema = new mongoose.Schema({

    first_name: {
        type: String

    },
    last_name: {
        type: String
    },
    image_Profile: {
        type: String
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    roles: {
        type: [String],
        default : ['USER']
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        default : []
    },
    teams: {
        type: [mongoose.Types.ObjectId],
        default : []
    },
    token: {
        type: String,
        default : ""
    }


}, {timestamps: true,strict : true });


const userModel = mongoose.model("user", userShema);

module.exports = {
    userModel
}
