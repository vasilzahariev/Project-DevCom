/**
 * @jest-environment node
 */

const mongoose = require('mongoose');
const {
    getAllNewsArticles,
    getNewsArticle,
    getNewsArticleComments,
    createArticle,
    addComment,
    getUserArticles,
    deleteArticle,
    publish
} = require('../controllers/newsController');
const NewsArticle = require('../models/NewsArticle');
const { register } = require('../controllers/authController');

describe('news', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://127.0.0.1:27017/news', {
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

    it(`should create a new article`, async () => {
        const { user } = await register({
            username: 'username',
            fullName: 'fullName',
            email: 'email@email.com',
            password: 'password'
        });

        const { path } = await createArticle({
            body: {
                authorId: user._id,
                title: 'title',
                path: 'path',
                content: 'content',
                isDraft: false,
                coverImageUrl: 'http://www.asd.com',
                tags: []
            }
        });

        const news = await NewsArticle.find();

        expect(path).toBe('path');
        expect(news.length).toBe(1);
    });

    it(`should get all articles`, async () => {
        const { user } = await register({
            username: 'username',
            fullName: 'fullName',
            email: 'email@email.com',
            password: 'password'
        });

        await createArticle({
            body: {
                authorId: user._id,
                title: 'title',
                path: 'path',
                content: 'content',
                isDraft: false,
                coverImageUrl: 'http://www.asd.com',
                tags: []
            }
        });

        await createArticle({
            body: {
                authorId: user._id,
                title: 'title2',
                path: 'path2',
                content: 'content',
                isDraft: false,
                coverImageUrl: 'http://www.asd.com',
                tags: []
            }
        });

        const articles = await getAllNewsArticles();

        expect(articles.length).toBe(2);
        expect(articles[0].path).toBe('path');
        expect(articles[1].path).toBe('path2');
    });

    it(`should get article with a specific path`, async () => {
        const { user } = await register({
            username: 'username',
            fullName: 'fullName',
            email: 'email@email.com',
            password: 'password'
        });

        const { path } = await createArticle({
            body: {
                authorId: user._id,
                title: 'title',
                path: 'path',
                content: 'content',
                isDraft: false,
                coverImageUrl: 'http://www.asd.com',
                tags: []
            }
        });

        const { article } = await getNewsArticle(path);

        expect(article).toBeTruthy();
        expect(article.title).toBe('title');
    });

    it(`should not get article with a specific path and return a 404`, async () => {
        const { user } = await register({
            username: 'username',
            fullName: 'fullName',
            email: 'email@email.com',
            password: 'password'
        });

        const { error } = await getNewsArticle('path');

        expect(error).toBe('404');
    });

    it(`should add a comment and get all comments on an article`, async () => {
        const { user } = await register({
            username: 'username',
            fullName: 'fullName',
            email: 'email@email.com',
            password: 'password'
        });

        const { path } = await createArticle({
            body: {
                authorId: user._id,
                title: 'title',
                path: 'path',
                content: 'content',
                isDraft: false,
                coverImageUrl: 'http://www.asd.com',
                tags: []
            }
        });

        const { article } = await getNewsArticle(path);

        const { status } = await addComment({
            articleId: article._id,
            commentatorId: user._id,
            comment: 'comment'
        });

        expect(status).toBeTruthy();

        const comments = await getNewsArticleComments(article._id);

        expect(comments.length).toBe(1);
    });

    it(`should get user articles`, async () => {
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

        await createArticle({
            body: {
                authorId: user._id,
                title: 'title',
                path: 'path',
                content: 'content',
                isDraft: false,
                coverImageUrl: 'http://www.asd.com',
                tags: []
            }
        });

        await createArticle({
            body: {
                authorId: user2._id,
                title: 'title2',
                path: 'path2',
                content: 'content2',
                isDraft: false,
                coverImageUrl: 'http://www.asd.com',
                tags: []
            }
        });

        const { articles: userArticles, status } = await getUserArticles(user.username);

        expect(status).toBeTruthy();
        expect(userArticles.length).toBe(1);
    });

    it(`should delete an article`, async () => {
        const { user } = await register({
            username: 'username',
            fullName: 'fullName',
            email: 'email@email.com',
            password: 'password'
        });

        const { path } = await createArticle({
            body: {
                authorId: user._id,
                title: 'title',
                path: 'path',
                content: 'content',
                isDraft: false,
                coverImageUrl: 'http://www.asd.com',
                tags: []
            }
        });

        const { article } = await getNewsArticle(path);

        const { status } = await deleteArticle(article._id);
        const articles = await NewsArticle.find();

        expect(status).toBeTruthy();
        expect(articles.length).toBe(0);
    });

    it(`should publish an article`, async () => {
        const { user } = await register({
            username: 'username',
            fullName: 'fullName',
            email: 'email@email.com',
            password: 'password'
        });

        const { path } = await createArticle({
            body: {
                authorId: user._id,
                title: 'title',
                path: 'path',
                content: 'content',
                isDraft: true,
                coverImageUrl: 'http://www.asd.com',
                tags: []
            }
        });

        const { article } = await getNewsArticle(path);
        const { status } = await publish(article._id);
        const updatedArticle = await NewsArticle.findById(article._id);

        expect(status).toBeTruthy();
        expect(updatedArticle.isDraft).toBeFalsy();
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

    await createArticle({
        body: {
            authorId: user._id,
            title: 'title',
            path: 'path',
            content: 'content',
            isDraft: false,
            coverImageUrl: 'http://www.asd.com',
            tags: []
        }
    });
});

*/