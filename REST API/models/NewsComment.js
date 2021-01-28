const mongoose = require('mongoose');
const NewsReply = require('./NewsReply');

const NewsComment = new mongoose.Schema({
    articleId: {
        type: 'ObjectId',
        ref: 'NewsComment'
    },
    commentatorId: {
        type: 'ObjectId',
        ref: 'User'
    },
    content: {
        type: String,
        required: true,
        minlength: 1
    }
});

module.exports = mongoose.model('NewsComment', NewsComment);
