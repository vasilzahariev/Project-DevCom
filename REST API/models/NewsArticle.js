const mongoose = require('mongoose');

const NewsArticleSchema = new mongoose.Schema({
    authorId: {
        type: 'ObjectId',
        ref: 'User'
    },
    title: {
        type: String,
        required: true,
        minlength: 1
    },
    path: {
        type: String,
        required: true,
        unique: true,
        minlength: 1
    },
    content: {
        type: String,
        required: true,
        minlength: 1
    },
    isDraft: {
        type: Boolean,
        default: false
    },
    coverImageUrl: {
        type: String
    },
    tags: {
        type: [String]
    },
    publishedDate: {
        type: Date,
        required: true
    },
    lastEditedDate: {
        type: Date,
        required: true
    },
    clicks: {
        type: [Date]
    }
});

module.exports = mongoose.model('NewsArticle', NewsArticleSchema);
