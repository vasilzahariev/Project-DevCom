/**
 * @jest-environment node
 */

const mongoose = require('mongoose');
const {
    createJob,
    getJobs,
    closeJob,
    getUserJobs,
    openJob,
    deleteJob
} = require('../controllers/jobsController');
const { register } = require('../controllers/authController');
const Job = require('../models/Job');

describe('jobs', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://127.0.0.1:27017/jobs', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    });

    beforeEach(async () => {
        await mongoose.connection.db.dropDatabase();
    });

    afterAll(async () => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close();
    });

    it(`should create a job`, async () => {
        const { user } = await register({
            username: 'username',
            fullName: 'fullName',
            email: 'email@email.com',
            password: 'password'
        });

        const { jobId } = await createJob({
            authorId: user._id,
            name: 'name',
            description: 'description',
            location: '',
            type: 'fullTime',
            negotiableSalary: true,
            salary: []
        });

        const jobs = await Job.find();

        expect(jobs.length).toBe(1);
        expect(jobs[0]._id.equals(jobId)).toBeTruthy();
    });

    it(`should return 0 jobs`, async () => {
        const jobs = await getJobs();

        expect(jobs.length).toBe(0);
    });

    it(`should return jobs`, async () => {
        const { user } = await register({
            username: 'username',
            fullName: 'fullName',
            email: 'email@email.com',
            password: 'password'
        });

        await createJob({
            authorId: user._id,
            name: 'name',
            description: 'description',
            location: '',
            type: 'fullTime',
            negotiableSalary: true,
            salary: []
        });

        await createJob({
            authorId: user._id,
            name: 'name 2',
            description: 'description 2',
            location: '',
            type: 'fullTime',
            negotiableSalary: false,
            salary: [1, 2]
        });

        const jobs = await getJobs();

        expect(jobs.length).toBe(2);
    });

    it(`should close and open a job`, async () => {
        const { user } = await register({
            username: 'username',
            fullName: 'fullName',
            email: 'email@email.com',
            password: 'password'
        });

        const { jobId } = await createJob({
            authorId: user._id,
            name: 'name',
            description: 'description',
            location: '',
            type: 'fullTime',
            negotiableSalary: true,
            salary: []
        });

        const { status } = await closeJob(jobId);
        const job = await Job.findById(jobId);

        expect(status).toBeTruthy();
        expect(job.isClosed).toBeTruthy();

        const { status: openStatus } = await openJob(jobId);
        const updatedJob = await Job.findById(jobId);

        expect(openStatus).toBeTruthy();
        expect(updatedJob.isClosed).toBeFalsy();
    });

    it(`should get user's jobs`, async () => {
        const { user } = await register({
            username: 'username',
            fullName: 'fullName',
            email: 'email@email.com',
            password: 'password'
        });
        const { user: user2 } = await register({
            username: 'username2',
            fullName: 'fullName2',
            email: 'email2@email.com',
            password: 'password2'
        });

        await createJob({
            authorId: user._id,
            name: 'name',
            description: 'description',
            location: '',
            type: 'fullTime',
            negotiableSalary: true,
            salary: []
        });

        await createJob({
            authorId: user2._id,
            name: 'name',
            description: 'description',
            location: '',
            type: 'fullTime',
            negotiableSalary: true,
            salary: []
        });

        const { jobs, status } = await getUserJobs(user.username);

        expect(status).toBeTruthy();
        expect(jobs.length).toBe(1);
    });

    it(`should delete a job`, async () => {
        const { user } = await register({
            username: 'username',
            fullName: 'fullName',
            email: 'email@email.com',
            password: 'password'
        });

        const { jobId } = await createJob({
            authorId: user._id,
            name: 'name',
            description: 'description',
            location: '',
            type: 'fullTime',
            negotiableSalary: true,
            salary: []
        });

        const { status } = await deleteJob(jobId);

        const jobs = await Job.find();

        expect(status).toBeTruthy();
        expect(jobs.length).toBe(0);
    });
});

/*

it(``, async () => {
    const { user } = await register({
        username: 'username',
        fullName: 'fullName',
        email: 'email@email.com',
        password: 'password'
    });
});

*/