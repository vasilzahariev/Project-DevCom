const UserWorkExperience = require('../models/UserWorkExperience');
const Work = require('../models/Work');

const {
    getUserIdByUsername
} = require('./authController');

const addWork = async body => {
    const {
        username,
        company,
        companyUrl,
        position,
        info,
        from,
        to
    } = body;

    try {
        const userId = await getUserIdByUsername(username);

        const work = new Work({
            company,
            companyUrl,
            position,
            info,
            years: [from, to]
        });

        await work.save();

        const userWork = new UserWorkExperience({
            userId,
            workId: work._id
        });

        await userWork.save();
    } catch (err) {
        return {
            status: false
        }
    }

    return {
        status: true
    }
}

const getWrokExperience = async id => {
    return await Work.findById(id);
}

const getWorkExperiences = async username => {
    try {
        const userId = await getUserIdByUsername(username);

        const userWorkExperiences = await UserWorkExperience.find({ userId });

        return await Promise.all(userWorkExperiences.map(async uw => await getWrokExperience(uw.workId)));
    } catch (err) {
        return null;
    }
}

const deleteWork = async id => {
    try {
        await UserWorkExperience.findOneAndDelete({ workId: id });
        await Work.findByIdAndDelete(id);

        return {
            status: true
        };
    } catch (err) {
        console.log(err);

        return {
            status: false
        };
    }
}

const editWork = async body => {
    try {
        const {
            id,
            company,
            companyUrl,
            position,
            info,
            from,
            to
        } = body;

        await Work.findByIdAndUpdate(id, {
            company: company,
            companyUrl: companyUrl,
            position: position,
            info: info
            // TODO: Add Years
        });

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

module.exports = {
    addWork,
    getWorkExperiences,
    deleteWork,
    editWork
}
