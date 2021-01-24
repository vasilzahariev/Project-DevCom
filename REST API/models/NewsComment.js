const mongoose = require('mongoose');

const NewsComment = new mongoose.Schema({
    articleId: {
        type: 'ObjectId',
        ref: 'NewsComment'
    },
    content: {
        type: String,
        required: true,
        minlength: 1
    },
    responses: {
        type: [String]
    }
});

module.exports = mongoose.model('NewsComment', NewsComment);
