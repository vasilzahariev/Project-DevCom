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

    // TODO: do a swap if the first salary value is bigger than the second one

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

const getJobs = async () => {
    return await Job.find();
}

module.exports = {
    createJob,
    getJobs
}
