const Job = require('../models/Job');
const { getUserIdByUsername } = require('./authController');

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

const closeJob = async id => {
    try {
        await Job.findByIdAndUpdate(id, { isClosed: true });
    } catch (err) {
        console.log(err);

        return {
            status: false
        }
    }

    return {
        status: true
    }
}

const openJob = async id => {
    try {
        await Job.findByIdAndUpdate(id, { isClosed: false });
    } catch (err) {
        console.log(err);

        return {
            status: false
        }
    }

    return {
        status: true
    }
}

const getUserJobs = async username => {
    try {
        const userId = await getUserIdByUsername(username);
        const jobs = await Job.find({ authorId: userId });

        return {
            status: true,
            jobs
        };
    } catch {
        return {
            status: false
        }
    }
}

module.exports = {
    createJob,
    getJobs,
    closeJob,
    getUserJobs,
    openJob
}
