const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    authorId: {
        type: 'ObjectId',
        ref: 'User'
    },
    type: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    publishDate: {
        type: Date,
        required: true
    },
    isClosed: {
        type: Boolean,
        required: true,
        default: false
    },
    salaryRanges: {
        type: [Number]
    },
    isNegotiableSalary: {
        type: Boolean
    },
    location: {
        type: String
    }
});

module.exports = mongoose.model('Job', JobSchema);
