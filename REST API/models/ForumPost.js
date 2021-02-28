const mongoose = require('mongoose');

const ForumPostSchema = new mongoose.Schema({
    authorId: {
        type: 'ObjectId',
        ref: 'User'
    },
    forumId: {
        type: 'ObjectId',
        ref: 'Forum'
    },
    title :{
        type: String,
        required: true
    },
    coverImageUrl: {
        type: String
    },
    content: {
        type: String,
        required: true
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
    },
    publishedDate: {
        type: Date
    }
});

module.exports = mongoose.model('ForumPost', ForumPostSchema);
