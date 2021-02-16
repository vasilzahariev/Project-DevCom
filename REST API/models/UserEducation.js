const mongoose = require('mongoose');

const UserEducationSchema = new mongoose.Schema({
    userId: {
        type: 'ObjectId',
        ref: 'User'
    },
    educationId: {
        type: 'ObjectId',
        ref: 'Education'
    }
});

module.exports = mongoose.model('UserEducation', UserEducationSchema);
