const Education = require('../models/Education');
const UserEducation = require('../models/UserEducation');
const {
    checkIfUserExistsById,
    getUserIdByUsername
} = require('./authController');

const addEducation = async body => {
    const {
        userId,
        school,
        schoolLink,
        degree,
        specialization,
        from,
        to
    } = body;

    const userExists = await checkIfUserExistsById(userId);

    if (!userExists) return false;

    const education = new Education({
        school,
        schoolLink,
        degree,
        specialization,
        years: [from, to]
    });

    await education.save();

    const userEducation = new UserEducation({
        userId,
        educationId: education._id
    });

    await userEducation.save();

    return true;
}

const getEducation = async id => {
    return await Education.findById(id);
}

const getEducations = async username => {
    const userId = await getUserIdByUsername(username);

    const edus = await UserEducation.find({ userId });

    return await Promise.all(edus.map(async edu => await getEducation(edu.educationId)));
}

const deleteEducation = async id => {
    try {
        await UserEducation.findOneAndDelete({ educationId: id });
        await Education.findByIdAndDelete(id);

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
    addEducation,
    getEducations,
    deleteEducation,
    deleteEducation
}
