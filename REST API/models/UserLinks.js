const mongoose = require('mongoose');

const UserLinksSchema = new mongoose.Schema({
    websiteUrl: {
        type: String
    },
    gitHubUrl: {
        type: String
    },
    gitLabUrl: {
        type: String
    },
    linkedInUrl: {
        type: String
    },
    stackOverflowUrl: {
        type: String
    },
    youTubeUrl: {
        type: String
    },
    twitterUrl: {
        type: String
    },
    twitchUrl: {
        type: String
    },
    facebookUrl: {
        type: String
    },
    instagramUrl: {
        type: String
    }
});

module.exports = mongoose.model('UserLinks', UserLinksSchema);
