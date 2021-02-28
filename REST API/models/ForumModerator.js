const mongoose = require('mongoose');

const ForumModeratorSchema = new mongoose.Schema({
    forumId: {
        type: 'ObjectId',
        ref: 'Forum'
    },
    userId: {
        type: 'ObjectId',
        ref: 'User'
    }
});

module.exports = mongoose.model('ForumModerator', ForumModeratorSchema);
