const NewsArticle = require('../models/NewsArticle');
const NewsComment = require('../models/NewsComment');
const NewsReply = require('../models/NewsReply');
const mongodb = require('mongodb')

const {
    getUserIdByUsername
} = require('./authController');

const getAllNewsArticles = async () => {
    return await NewsArticle.find();
}

const getNewsArticle = async (path) => {
    const article = await NewsArticle.findOne({ path: path });

    if (!article) {
        return {
            error: '404'
        }
    }

    //await NewsArticle.updateOne({ _id: article.id }, { $addToSet: { clicks: Date.now() }}); TODO: Look into this shit

    return {
        article
    }
}

const getNewsArticleComments = async articleId => {
    return await NewsComment.find({ articleId: articleId });
}

const checkIfTitleIsUnique = async title => {
    const count = await NewsArticle.count({ title: title });

    return count === 0;
}

const checkIfPathIsUnique = async path => {
    const count = await NewsArticle.count({ path: path });

    return count === 0;
}

const createArticle = async req => {
    const {
        authorId,
        title,
        path,
        content,
        isDraft,
        coverImageUrl,
        tags
    } = req.body;
    const isTitleUnique = await checkIfTitleIsUnique(title);

    if (!isTitleUnique) return { error: 'Title is already taken' };

    const isPathUnique = await checkIfPathIsUnique(path);

    if (!isPathUnique) return { error: 'Path is already taken' };

    try {
        const publishedDate = Date.now();

        const article = new NewsArticle({
            authorId,
            title,
            path,
            content,
            isDraft,
            coverImageUrl,
            tags,
            publishedDate,
            lastEditedDate: publishedDate
        });

        article.save();

        return { path };

    } catch (err) {
        console.log(err);

        return { error: '500' }
    }
}

const checkIfArticleExists = async id => {
    const count = await NewsArticle.count({ id: id });

    return count === 1;
}

const addComment = async body => {
    const {
        articleId,
        commentatorId,
        comment
    } = body;

    const isArticleReal = await checkIfArticleExists(articleId);

    if (isArticleReal) {
        return {
            status: false
        };
    }

    const newsComment = new NewsComment({
        articleId,
        commentatorId,
        content: comment
    });

    await newsComment.save();

    return {
        status: true
    }
}

const addReply = async body => {
    const {
        commentId,
        username,
        reply
    } = body;

    const newsReply = new NewsReply({
        commentId,
        content: reply,
        username
    });

    await newsReply.save();

    return {
        status: true
    }
}

const getReplies = async id => {
    return await NewsReply.find({ commentId: id });
}

const getUserArticles = async username => {
    try {
        const authorId = await getUserIdByUsername(username);
        const articles = await NewsArticle.find({ authorId });

        return {
            articles,
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
    getAllNewsArticles,
    getNewsArticle,
    getNewsArticleComments,
    createArticle,
    addComment,
    addReply,
    getReplies,
    getUserArticles
}