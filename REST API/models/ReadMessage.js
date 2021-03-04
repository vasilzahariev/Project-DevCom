const mongoose = require('mongoose');

const ReadMessageSchema = new mongoose.Schema({
    userId: {
        type: 'ObjectId',
        ref: 'User'
    },
    conversationId: {
        type: 'ObjectId',
        ref: 'Conversation'
    },
    messageId: {
        type: 'ObjectId',
        ref: 'Message'
    },
    read: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('ReadMessage', ReadMessageSchema);
