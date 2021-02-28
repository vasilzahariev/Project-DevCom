const mongoose = require('mongoose');

const ForumMemberSchema = new mongoose.Schema({
    forumId: {
        type: 'ObjectId',
        ref: 'Forum'
    },
    userId: {
        type: 'ObjectId',
        ref: 'User'
    }
});

module.exports = mongoose.model('ForumMember', ForumMemberSchema);
