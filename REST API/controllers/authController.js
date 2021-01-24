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

module.exports = {
    register,
    login,
    verifyToken
}
