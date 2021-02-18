const mongoose = require('mongoose');

const UserWorkExperienceShema = new mongoose.Schema({
    userId: {
        type: 'ObjectId',
        ref: 'User'
    },
    workId: {
        type: 'ObjectId',
        ref: 'Work'
    }
});

module.exports = mongoose.model('UserWorkExperience', UserWorkExperienceShema);
