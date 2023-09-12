const mongoose = require('mongoose')

const StorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true //gets rid of white space
    },
    body: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'public',
        enum: ['public', 'private'] //list of possible values
    },

    user: {
        type: mongoose.Schema.Types.ObjectId, //unique objectID of db object associated with specific user
        ref: 'User' //make reference back to created user model
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model("Story", StorySchema)