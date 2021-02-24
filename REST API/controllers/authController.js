const env = process.env.NODE_ENV || 'development';
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config')[env];
const User = require('../models/User');
const UserLinks = require('../models/UserLinks');

const createUserToken = userObj => {
    return jwt.sign({
        userId: userObj._id,
        username: userObj.username,
        isAdmin: userObj.isAdmin,
        isJournalist: userObj.isJournalist
    }, config.privateKey);
}

const verifyToken = async (token) => {
    try {
        const decoded = jwt.decode(token, config.privateKey);
        const user = await User.findById(decoded.userId);

        return {
            user
        }
    } catch (err) {
        console.log(err.message);

        return {
            error: err
        }
    }
}

const register = async body => {
    const {
        username,
        fullName,
        email,
        password
    } = body;

    const userLinks = new UserLinks();

    await userLinks.save();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
        const user = new User({
            username,
            email,
            password: hashedPassword,
            fullName,
            userLinksId: userLinks._id
        });

        const userObj = await user.save();
        const token = createUserToken(userObj);

        return {
            user: userObj,
            token
        };
    } catch (err) {
        console.log(err.message);

        if (err.message.includes('E11000') && err.message.includes('username'))
            return { error: 'Username is already taken' };
        else if (err.message.includes('E11000') && err.message.includes('email'))
            return { error: 'Email is already taken' };
        else
            return { error: err };
    }
}

const login = async body => {
    const {
        username,
        password
    } = body;

    try {
        const userObj = await User.findOne({ username: username });

        if (userObj === null) {
            return { error: 'Invalid username' };
        }

        const result = await bcrypt.compare(password, userObj.password);

        if (!result) {
            return { error: 'Invalid password' }
        }

        const token = createUserToken(userObj);

        return { token, user: userObj };

    } catch (error) {
        console.log(error);

        return {
            error: error
        }
    }
}

const getUserById = async id => {
    return await User.findById(id);
}

const checkIfUsernameExists = async username => {
    const count = await User.count({ username: username });

    return count === 1;
}

const getUserByUsername = async username => {
    const user = await User.findOne({ username });
    const userLinks = await UserLinks.findById(user.userLinksId);

    return {
        user,
        userLinks
    }
}

const checkIfUserExistsById = async id => {
    const count = await User.count({ _id: id });

    return count != 0;
}

const getUserIdByUsername = async username => {
    const user = await User.findOne({ username });

    return user._id;
}

const getUserInformation = async username => {
    try {
        const user = await User.findOne({ username });
        const userLinks = await UserLinks.findById(user.userLinksId);

        return {
            user,
            userLinks,
            status: true
        }
    } catch (err) {
        console.log(err);

        return {
            status: false
        }
    }
}

const doesTheUsernameBelongToUserWithId = async (username, id) => {
    const user = await User.findById(id);

    return user.username === username;
}

const checkIfEmailExists = async email => {
    const count = await User.count({ email });

    return count !== 0;
}

const doesTheEmailBelongToUserWithId = async (email, id) => {
    const user = await User.findById(id);

    return user.email === email;
}

const updateUserInfo = async body => {
    const {
        user,
        userLinks
    } = body;

    try {
        const usernameExists = await checkIfUsernameExists(user.username);

        if (usernameExists) {
            const usernameCheck = await doesTheUsernameBelongToUserWithId(user.username, user.id);

            if (!usernameCheck) return { err: 'Username taken' };
        }

        const emailExists = await checkIfEmailExists(user.email);

        if (emailExists) {
            const emailCheck = await doesTheEmailBelongToUserWithId(user.email, user.id);

            if (!emailExists) return { err: 'Email taken' };
        }

        await User.findByIdAndUpdate(user.id, {
            username: user.username,
            email: user.email,
            fullName: user.fullName,
            bio: user.bio,
            profilePictureUrl: user.profilePictureUrl,
        })

        await UserLinks.findByIdAndUpdate(userLinks.id, {
            gitHubUrl: userLinks.gitHubUrl,
            websiteUrl: userLinks.websiteUrl,
            linkedInUrl: userLinks.linkedInUrl,
            youTubeUrl: userLinks.youTubeUrl,
            twitterUrl: userLinks.twitterUrl,
            facebookUrl: userLinks.facebookUrl,
            instagramUrl: userLinks.instagramUrl
        });

        return {
            status: true,
            username: user.username
        }
    } catch (err) {
        console.log(err);

        return {
            err
        }
    }
}

const getAllUsers = async () => {
    return await User.find();
}

module.exports = {
    register,
    login,
    verifyToken,
    getUserById,
    checkIfUsernameExists,
    getUserByUsername,
    checkIfUserExistsById,
    getUserIdByUsername,
    getUserInformation,
    updateUserInfo,
    getAllUsers
}
