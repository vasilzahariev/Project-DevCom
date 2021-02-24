const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    conversationId: {
        type: 'ObjectId',
        ref: 'Conversation'
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date
    },
    userId: {
        type: 'ObjectId',
        ref: 'User'
    }
});

module.exports = mongoose.model('Message', MessageSchema);
