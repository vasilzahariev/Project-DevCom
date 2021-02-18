const mongoose = require('mongoose');

const WorkSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true
    },
    companyUrl: {
        type: String
    },
    position: {
        type: String,
        required: true
    },
    info: {
        type: String
    },
    years: {
        type: [Number]
    }
});

module.exports = mongoose.model('Work', WorkSchema);
