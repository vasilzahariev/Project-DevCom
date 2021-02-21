const mongoose = require('mongoose');

const FeedPostReplySchema = new mongoose.Schema({
    authorId: {
        type: 'ObjectId',
        ref: 'User'
    },
    postId: {
        type: 'ObjectId',
        ref: 'FeedPost'
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
        type: Date
    }
});

module.exports = mongoose.model('FeedPostReply', FeedPostReplySchema);

