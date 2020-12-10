const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^(([^<>()\[\]\\\\.,;:\s@"]+(\.[^<>()\[\]\\\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    fullName: {
        type: String,
        required: true
    },
    birthDate: {
        type: Date
    },
    bio: {
        type: String
    },
    // TODO: Add default value here:
    profilePictureUrl: {
        type: String
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    isJournalist: {
        type: Boolean,
        required: true,
        default: false
    },
    isCompany: {
        type: Boolean,
        required: true,
        default: false
    },
    isVerified: {
        type: Boolean,
        required: true,
        default: false
    },
    userLinksId: {
        type: 'ObjectId',
        ref: 'UserLinks'
    }
});

module.exports = mongoose.model('User', UserSchema);
