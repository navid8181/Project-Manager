const mongoose = require('mongoose');


const projectShema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    text: {
        type: String
    },
    image: {
        type: String,
        default: "/default/default.png"
    },
    owner: {
        type: mongoose.Types.ObjectId,
        required: true

    },
    team: {
        type: mongoose.Types.ObjectId,
        

    },
    private: {
        type: Boolean,
        default : false

    }


}, {timestamps: true});


const projectModel = mongoose.model("project", projectShema);

module.exports = {
    projectModel
}
