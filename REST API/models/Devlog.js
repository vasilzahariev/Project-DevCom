const mongoose = require('mongoose');

const DevlogSchema = new mongoose.Schema({
    projectId: {
        type: 'ObjectId',
        ref: 'Project'
    },
    authorId: {
        type: 'ObjectId',
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    isDraft: {
        type: Boolean
    },
    publishedDate: {
        type: Date
    }
});

module.exports = mongoose.model('Devlog', DevlogSchema);
