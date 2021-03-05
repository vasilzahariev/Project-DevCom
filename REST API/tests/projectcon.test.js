/**
 * @jest-environment node
 */

const mongoose = require('mongoose');
const {
    create,
    getProjects,
    getProjectByUrl,
    addDevlog,
    deleteDevlog,
    deleteProject,
    getAllProjects
} = require('../controllers/projectController');
const { register } = require('../controllers/authController');
const Devlog = require('../models/Devlog');
const Project = require('../models/Project');

describe('projectcon', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://127.0.0.1:27017/projectcon', {
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

    it(`should create a project`, async () => {
        const { user } = await register({
            username: 'username',
            fullName: 'fullName',
            email: 'email@email.com',
            password: 'password'
        });

        const { status, projectUrl } = await create({
            ownerId: user._id,
            name: 'name',
            projectUrl: 'projectUrl',
            description: 'desc',
            gitHubUrl: ''
        });

        expect(status).toBeTruthy;
        expect(projectUrl).toBe('projectUrl');
    });

    it(`should return user's projects`, async () => {
        const { user } = await register({
            username: 'username',
            fullName: 'fullName',
            email: 'email@email.com',
            password: 'password'
        });

        await create({
            ownerId: user._id,
            name: 'name',
            projectUrl: 'projectUrl',
            description: 'desc',
            gitHubUrl: ''
        });

        await create({
            ownerId: user._id,
            name: 'name2',
            projectUrl: 'projectUrl2',
            description: 'desc',
            gitHubUrl: ''
        });

        const projects = await getProjects(user.username);

        expect(projects.length).toBe(2);
    });

    it(`should get project with url`, async () => {
        const { user } = await register({
            username: 'username',
            fullName: 'fullName',
            email: 'email@email.com',
            password: 'password'
        });

        const { projectUrl } = await create({
            ownerId: user._id,
            name: 'name',
            projectUrl: 'projectUrl',
            description: 'desc',
            gitHubUrl: ''
        });

        const { project } = await getProjectByUrl(projectUrl);

        expect(project).toBeTruthy();
        expect(project.name).toBe('name');
        expect(project.projectUrl).toBe('projectUrl');
    });

    it(`should add a devlog`, async () => {
        const { user } = await register({
            username: 'username',
            fullName: 'fullName',
            email: 'email@email.com',
            password: 'password'
        });

        const { projectUrl } = await create({
            ownerId: user._id,
            name: 'name',
            projectUrl: 'projectUrl',
            description: 'desc',
            gitHubUrl: ''
        });

        const { project } = await getProjectByUrl(projectUrl);

        const { status } = await addDevlog({
            projectId: project._id,
            authorId: user._id,
            title: 'title',
            content: 'content',
            isDraft: false
        });
        const devlogs = await Devlog.find();

        expect(status).toBeTruthy();
        expect(devlogs.length).toBe(1);
    });

    it(`should delete a devlog`, async () => {
        const { user } = await register({
            username: 'username',
            fullName: 'fullName',
            email: 'email@email.com',
            password: 'password'
        });

        const { projectUrl } = await create({
            ownerId: user._id,
            name: 'name',
            projectUrl: 'projectUrl',
            description: 'desc',
            gitHubUrl: ''
        });

        const { project } = await getProjectByUrl(projectUrl);

        await addDevlog({
            projectId: project._id,
            authorId: user._id,
            title: 'title',
            content: 'content',
            isDraft: false
        });
        const updatedProject = await getProjectByUrl(projectUrl);

        const { status } = await deleteDevlog(updatedProject.devLogs[0]._id);
        const devlogs = await Devlog.find();

        expect(status).toBeTruthy();
        expect(devlogs.length).toBe(0);
    });

    it(`should delete project`, async () => {
        const { user } = await register({
            username: 'username',
            fullName: 'fullName',
            email: 'email@email.com',
            password: 'password'
        });
    
        const { projectUrl } = await create({
            ownerId: user._id,
            name: 'name',
            projectUrl: 'projectUrl',
            description: 'desc',
            gitHubUrl: ''
        });

        const { project } = await getProjectByUrl(projectUrl);

        await addDevlog({
            projectId: project._id,
            authorId: user._id,
            title: 'title',
            content: 'content',
            isDraft: false
        });

        const { status } = await deleteProject(project._id);
        const projects = await Project.find();
        const devlogs = await Devlog.find();

        expect(status).toBeTruthy();
        expect(projects.length).toBe(0);
        expect(devlogs.length).toBe(0);
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

    await create({
        ownerId: user._id,
        name: 'name',
        projectUrl: 'projectUrl',
        description: 'desc',
        gitHubUrl: ''
    });
});

*/