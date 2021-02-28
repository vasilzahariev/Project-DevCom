const mongoose = require('mongoose');

const ForumSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    ownerId: {
        type: 'ObjectId',
        ref: 'User'
    },
    description: {
        type: String
    },
    iconUrl: {
        type: String
    },
    createdDate: {
        type: Date
    }
});

module.exports = mongoose.model('Forum', ForumSchema);
