const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    ownerId: {
        type: 'ObjectId',
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    projectUrl: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String
    },
    gitHubUrl: {
        type: String
    },
    date: {
        type: Date
    }
});

module.exports = mongoose.model('Project', ProjectSchema);
