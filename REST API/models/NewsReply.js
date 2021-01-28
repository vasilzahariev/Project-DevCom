const mongoose = require('mongoose');

const NewsReplySchema = new mongoose.Schema({
    commentId: {
        type: 'ObjectId',
        ref: 'NewsComment'
    },
    content: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('NewsReply', NewsReplySchema);
