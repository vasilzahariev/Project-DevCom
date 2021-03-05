/**
 * @jest-environment node
 */

const mongoose = require('mongoose');
const {
    addPost,
    getUserFeed,
    like,
    comment,
    getComments
} = require('../controllers/feedController');
const { register } = require('../controllers/authController');
const FeedPost = require('../models/FeedPost');

describe('feed', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://127.0.0.1:27017/feed', {
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

    it(`should add a post`, async () => {
        const { user } = await register({
            username: 'username',
            fullName: 'fullName',
            email: 'email@email.com',
            password: 'password'
        });

        const { status } = await addPost({
            username: user.username,
            content: 'Hey, this is my first post on my blog',
            imageUrl: ''
        });

        const postCount = await FeedPost.count();

        expect(status).toBeTruthy();
        expect(postCount).toBe(1);
    });

    it(`should not add a post`, async () => {
        const { user } = await register({
            username: 'username',
            fullName: 'fullName',
            email: 'email@email.com',
            password: 'password'
        });

        const { status } = await addPost({
            username: user.username,
            content: '',
            imageUrl: ''
        });

        const postCount = await FeedPost.count();

        expect(status).toBeFalsy();
        expect(postCount).toBe(0);
    });

    it(`should get user feed`, async () => {
        const { user } = await register({
            username: 'username',
            fullName: 'fullName',
            email: 'email@email.com',
            password: 'password'
        });

        await addPost({
            username: user.username,
            content: 'Hey, this is my first post on my blog',
            imageUrl: ''
        });
        await addPost({
            username: user.username,
            content: 'Hey, this is my second post on my blog',
            imageUrl: ''
        });

        const feed = await getUserFeed(user.username);

        expect(feed).toBeTruthy();
        expect(feed.length).toBe(2);
    });

    it(`should like feed post`, async () => {
        const { user } = await register({
            username: 'username',
            fullName: 'fullName',
            email: 'email@email.com',
            password: 'password'
        });

        await addPost({
            username: user.username,
            content: 'Hey, this is my first post on my blog',
            imageUrl: ''
        });

        const feed = await getUserFeed(user.username);
        const postId = feed[0].post._id;

        await like({
            userId: user._id,
            postId
        });

        const updatedPost = await FeedPost.findById(postId);
        const likesCount = updatedPost.likes.length;

        expect(likesCount).toBe(1);
    });

    it(`should not like feed post`, async () => {
        const { user } = await register({
            username: 'username',
            fullName: 'fullName',
            email: 'email@email.com',
            password: 'password'
        });

        await addPost({
            username: user.username,
            content: 'Hey, this is my first post on my blog',
            imageUrl: ''
        });

        const feed = await getUserFeed(user.username);
        const postId = feed[0].post._id;

        await like({
            userId: undefined,
            postId
        });

        const updatedPost = await FeedPost.findById(postId);
        const likesCount = updatedPost.likes.length;

        expect(likesCount).toBe(0);
    });

    it(`should create and get comment`, async () => {
        const { user } = await register({
            username: 'username',
            fullName: 'fullName',
            email: 'email@email.com',
            password: 'password'
        });

        await addPost({
            username: user.username,
            content: 'Hey, this is my first post on my blog',
            imageUrl: ''
        });

        const feed = await getUserFeed(user.username);
        const postId = feed[0].post._id;

        const status = await comment({
            userId: user._id,
            postId,
            content: 'Nice',
            imageUrl: ''
        });
        
        expect(status).toBeTruthy();

        const comments = await getComments(postId);

        expect(comments).toBeTruthy();
        expect(comments.length).toBe(1);
    });
});

/*

it(``, async () => {

});

*/