const Job = require('../models/Job');

const createJob = async body => {
    const {
        authorId,
        name,
        description,
        location,
        type,
        negotiableSalary,
        salary
    } = body;

    const job = new Job({
        authorId,
        type,
        name,
        description,
        publishDate: Date.now(),
        isClosed: false,
        salaryRanges: salary,
        isNegotiableSalary: negotiableSalary,
        location,
    });

    await job.save();

    return {
        jobId: job.id
    }
}

module.exports = {
    createJob
}
