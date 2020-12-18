const mongoose = require('mongoose');

const UserLinksSchema = new mongoose.Schema({
    websiteUrl: {
        type: String,
        default: ''
    },
    gitHubUrl: {
        type: String,
        default: ''
    },
    gitLabUrl: {
        type: String,
        default: ''
    },
    linkedInUrl: {
        type: String,
        default: ''
    },
    stackOverflowUrl: {
        type: String,
        default: ''
    },
    youTubeUrl: {
        type: String,
        default: ''
    },
    twitterUrl: {
        type: String,
        default: ''
    },
    twitchUrl: {
        type: String,
        default: ''
    },
    facebookUrl: {
        type: String,
        default: ''
    },
    instagramUrl: {
        type: String,
        default: ''
    }
});

module.exports = mongoose.model('UserLinks', UserLinksSchema);
