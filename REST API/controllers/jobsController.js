const Job = require('../models/Job');
const { getUserIdByUsername, getUserById } = require('./authController');

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

    if (!negotiableSalary && salary[0] < salary[1]) {
        const temp = salary[0];

        salary[0] = salary[1];
        salary[1] = temp;
    }

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

const getJobsWithUsers = async () => {
    try {
        const jobsObj = await Job.find();
        const jobs = await Promise.all(jobsObj.map(async job => {
            const user = await getUserById(job.authorId);

            return Object.assign({ user }, job._doc);
        }));

        return {
            status: true,
            jobs
        }
    } catch (err) {
        console.log(err);
        
        return {
            status: false
        }
    }
}

const deleteJob = async id => {
    try {
        await Job.findByIdAndDelete(id);

        return {
            status: true
        }
    } catch (err) {
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
    openJob,
    getJobsWithUsers,
    deleteJob
}
