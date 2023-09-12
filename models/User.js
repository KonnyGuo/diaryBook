const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    googleID: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    image: {
        type: String,
        // required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
})

//third parameter will be collection name.
//if third parameter not enter then whatever you name the mode will be the db's collection name
//in this case it will be User pluralized so users
module.exports = mongoose.model("User", UserSchema)