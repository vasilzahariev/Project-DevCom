const mongoose = require('mongoose');

const ForumCommentSchema = new mongoose.Schema({
    userId: {
        type: 'ObjectId',
        ref: 'User'
    },
    postId: {
        type: 'ObjectId',
        ref: 'ForumPost'
    },
    content: {
        type: String,
        required: true
    },
    answer: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date
    },
    likes: {
        type: [{
            type: 'ObjectId',
            ref: 'User'
        }]
    },
    dislikes: {
        type: [{
            type: 'ObjectId',
            ref: 'User'
        }]
    }
});

module.exports = mongoose.model('ForumComment', ForumCommentSchema);
