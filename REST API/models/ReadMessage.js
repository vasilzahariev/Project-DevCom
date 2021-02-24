const mongoose = require('mongoose');

const ReadMessageSchema = new mongoose.Schema({
    userId: {
        type: 'Object',
        ref: 'User'
    },
    messageId: {
        type: 'Object',
        ref: 'Message'
    },
    read: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('ReadMessage', ReadMessageSchema);
