const UserProject = require('../models/UserProject');
const Project = require('../models/Project');
const Devlog = require('../models/Devlog');

const { getUserIdByUsername, getUserById, checkIfUsernameExists } = require('./authController');

const checkIfUrlExists = async url => {
    const count = await Project.count({ projectUrl: url });

    return count !== 0;
}

const create = async body => {
    const {
        ownerId,
        name,
        projectUrl,
        description,
        gitHubUrl
    } = body;

    const exists = await checkIfUrlExists(projectUrl);

    if (exists) {
        return {
            status: false,
            err: 'Url is taken'
        }
    }

    try {
        const project = new Project({
            ownerId,
            name,
            projectUrl,
            description,
            gitHubUrl,
            date: Date.now()
        });

        await project.save();

        const userProject = new UserProject({
            userId: ownerId,
            projectId: project._id
        });

        await userProject.save();

        return {
            status: true,
            projectUrl
        }

    } catch (err) {
        console.log(err);

        return {
            status: false
        }
    }
}

const getProject = async id => {
    return await Project.findById(id);
}

const getProjects = async username => {
    const userId = await getUserIdByUsername(username);

    const projects = await UserProject.find({ userId });

    return await Promise.all(projects.map(async project => {
        return await getProject(project.projectId);
    }));
}

const getProjectByUrl = async url => {
    const count = await Project.count({ projectUrl: url });

    if (count != 1) {
        return {
            status: false
        }
    }

    const project = await Project.findOne({ projectUrl: url });
    const devLogs = await Devlog.find({ projectId: project._id, isDraft: false });
    const userIds = await UserProject.find({ projectId: project._id });

    const members = await Promise.all(userIds.map(async obj => {
        return await getUserById(obj.userId);
    }));

    return {
        project,
        devLogs,
        members,
        status: true
    }
}

const edit = async (id, body) => {
    const {
        name,
        projectUrl,
        description,
        gitHubUrl
    } = body;

    try {
        const project = await getProject(id);
        const exists = await checkIfUrlExists(projectUrl);

        if (project.projectUrl !== projectUrl && exists) {
            return {
                status: false,
                err: 'Url is taken'
            }
        }

        await Project.findByIdAndUpdate(id, {
            name,
            projectUrl,
            description,
            gitHubUrl
        });

        return {
            status: true,
            url: projectUrl
        }
    } catch (err) {
        console.log(err);

        return {
            status: false
        }
    }
}

const checkIfAlreadyAMember = async (projectId, userId) => {
    const count = await UserProject.count({ projectId, userId });

    return count !== 0;
}

const addMember = async (id, username) => {
    try {
        const exists = await checkIfUsernameExists(username);

        if (!exists) {
            return {
                status: false,
                err: `Invalid Username`
            }
        }

        const userId = await getUserIdByUsername(username);
        const alreadyAMember = await checkIfAlreadyAMember(id, userId);

        if (alreadyAMember) {
            return {
                status: false,
                err: `Already a member`
            }
        }

        const member = new UserProject({
            projectId: id,
            userId
        });

        await member.save();

        return {
            status: true
        }
    } catch (err) {
        console.log(err);

        return {
            status: false
        }
    }
}

const addDevlog = async body => {
    const {
        projectId,
        authorId,
        title,
        content,
        isDraft
    } = body;

    try {
        const devlog = new Devlog({
            projectId,
            authorId,
            title,
            content,
            isDraft,
            publishedDate: Date.now()
        });

        await devlog.save();

        return {
            status: true
        }
    } catch (err) {
        console.log(err);

        return {
            status: false
        }
    }
}

const getUserDevlogs = async username => {
    try {
        const authorId = await getUserIdByUsername(username);
        const dls = await Devlog.find({ authorId });
        const devlogs = await Promise.all(dls.map(async devlog => {
            const project = await Project.findById(devlog.projectId);

            return {
                _id: devlog._id,
                projectId: devlog.projectId,
                authorId: devlog.authorId,
                title: devlog.title,
                content: devlog.content,
                isDraft: devlog.isDraft,
                publishedDate: devlog.publishedDate,
                project
            }
        }));

        return {
            status: true,
            devlogs
        }
    } catch (err) {
        console.log(err);

        return {
            status: false
        }
    }
}

module.exports = {
    create,
    getProjects,
    getProjectByUrl,
    edit,
    addMember,
    addDevlog,
    getUserDevlogs
}