const mongoose = require('mongoose');

const UserProjectSchema = new mongoose.Schema({
    userId: {
        type: 'ObjectId',
        ref: 'User'
    },
    projectId: {
        type: 'ObjectId',
        ref: 'Project'
    }
});

module.exports = mongoose.model('UserProject', UserProjectSchema);
