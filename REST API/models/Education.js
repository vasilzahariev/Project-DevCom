const mongoose = require('mongoose');

const EducationSchema = new mongoose.Schema({
    school: {
        type: String,
        required: true
    },
    schoolLink: {
        type: String
    },
    specialization: {
        type: String,
        required: true
    },
    degree: {
        type: String,
        required: true
    },
    years: {
        type: [Number]
    }
});

module.exports = mongoose.model('Education', EducationSchema);
