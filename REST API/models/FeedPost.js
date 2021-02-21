const mongoose = require('mongoose');

const FeedPostSchema = new mongoose.Schema({
    authorId: {
        type: 'ObjectId',
        ref: 'User'
    },
    content: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    },
    likes: {
        type: [{
            type: 'ObjectId',
            ref: 'User'
        }]
    },
    date: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('FeedPost', FeedPostSchema);
