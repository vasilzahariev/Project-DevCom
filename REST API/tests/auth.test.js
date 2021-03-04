/**
 * @jest-environment node
 */

const mongoose = require('mongoose');
const User = require('../models/User');
const {
    register,
    login,
    getUserById,
    checkIfUsernameExists,
    getUserByUsername,
    checkIfUserExistsById,
    getUserIdByUsername,
    getUserInformation,
    getAllUsers,
    setRole
} = require('../controllers/authController');

describe('auth', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://127.0.0.1:27017/auth', {
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

    it('should return 0 users', async () => {
        const users = await getAllUsers();

        expect(users.length).toBe(0);
    });

    it('should return 1 users', async () => {
        const user = new User({
            username: '123',
            password: '123123',
            email: '123@abv.bg',
            fullName: '123 123'
        });

        await user.save();

        const users = await getAllUsers();

        expect(users.length).toBe(1);
    });

    it('should register user', async () => {
        const { user, token } = await register({
            username: 'username',
            fullName: 'fullName',
            email: 'email@email.com',
            password: 'password'
        });

        expect(user.username).toBe('username');
        expect(token).not.toBe(undefined);
    });

    it('should log the user in', async () => {
        const { user: regUser } = await register({
            username: 'username',
            fullName: 'fullName',
            email: 'email@email.com',
            password: 'password'
        });

        const { user: logUser } = await login({
            username: 'username',
            password: 'password'
        });

        expect(regUser._id).toEqual(logUser._id);
    });

    it('should not log the user in', async () => {
        const { regUser } = await register({
            username: 'username',
            fullName: 'fullName',
            email: 'email@email.com',
            password: 'password'
        });

        const { error } = await login({
            username: 'usernameNotFound',
            password: 'password'
        });

        expect(error).toBe('Invalid username');
    });

    it('should not log the user in 2', async () => {
        const { regUser } = await register({
            username: 'username',
            fullName: 'fullName',
            email: 'email@email.com',
            password: 'password'
        });

        const { error } = await login({
            username: 'username',
            password: 'password2'
        });

        expect(error).toBe('Invalid password');
    });

    it('should get the user by id', async () => {
        const { user: regUser } = await register({
            username: 'username',
            fullName: 'fullName',
            email: 'email@email.com',
            password: 'password'
        });

        const user = await getUserById(regUser._id);

        expect(user.username).toBe(regUser.username);
    });

    it('should return true, because the username exists', async () => {
        await register({
            username: 'username',
            fullName: 'fullName',
            email: 'email@email.com',
            password: 'password'
        });

        const exists = await checkIfUsernameExists('username');

        expect(exists).toBeTruthy();
    });

    it(`should return false, because the username doesn't exists`, async () => {
        const exists = await checkIfUsernameExists('username');

        expect(exists).not.toBeTruthy();
    });

    it(`should return user by username`, async () => {
        const { user: regUser } = await register({
            username: 'username',
            fullName: 'fullName',
            email: 'email@email.com',
            password: 'password'
        });

        const user = await getUserByUsername(regUser.username);

        expect(user._id).toEqual(user._id);
    });

    it(`should not return user by username`, async () => {
        const user = await getUserByUsername('username');

        expect(user).toBeFalsy();
    });

    it(`should return true, because a user with id exists`, async () => {
        const { user } = await register({
            username: 'username',
            fullName: 'fullName',
            email: 'email@email.com',
            password: 'password'
        });

        const exists = await checkIfUserExistsById(user._id);

        expect(exists).toBeTruthy();
    });

    it(`should return false, because a user with the id doesn't exist`, async () => {
        const exists = await checkIfUserExistsById(undefined);

        expect(exists).toBeFalsy();
    });

    it(`should return id`, async () => {
        const { user } = await register({
            username: 'username',
            fullName: 'fullName',
            email: 'email@email.com',
            password: 'password'
        });

        const id = await getUserIdByUsername(user.username);

        expect(id).toEqual(user._id);
    });

    it(`should return user information`, async () => {
        const { user } = await register({
            username: 'username',
            fullName: 'fullName',
            email: 'email@email.com',
            password: 'password'
        });

        const { user: resUser, userLinks, status } = await getUserInformation(user.username);

        expect(resUser).toBeTruthy();
        expect(userLinks).toBeTruthy();
        expect(status).toBeTruthy();
    });

    it(`should not return user information`, async () => {
        const { status } = await getUserInformation('username');

        expect(status).toBeFalsy();
    });

    it(`should set a new role`, async () => {
        const { user } = await register({
            username: 'username',
            fullName: 'fullName',
            email: 'email@email.com',
            password: 'password'
        });

        const status = await setRole({
            id: user._id,
            role: 'admin',
            status: true
        });

        expect(status).toBeTruthy();

        const newUser = await getUserById(user._id);

        expect(newUser.isAdmin).toBeTruthy();
    });
});

/*

it(``, async () => {

});

*/
