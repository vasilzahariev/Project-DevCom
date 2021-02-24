const mongoose = require('mongoose');

const ConversationSchema = new mongoose.Schema({
    creatorId: {
        type: 'ObjectId',
        ref: 'User'
    },
    name: {
        type: String
    },
    users: {
        type: [{
            type: 'ObjectId',
            ref: 'User'
        }]
    }
});

module.exports = mongoose.model('Conversation', ConversationSchema);
