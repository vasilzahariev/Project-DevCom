const NewsArticle = require('../models/NewsArticle');
const NewsComment = require('../models/NewsComment');
const NewsReply = require('../models/NewsReply');
const mongodb = require('mongodb')

const {
    getUserIdByUsername, getUserById
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

        await article.save();

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

const getAllNewsArticlesWithAuthor = async () => {
    try {
        const articlesObj = await NewsArticle.find();
        const articles = await Promise.all(articlesObj.map(async article => {
            const author = await getUserById(article.authorId);

            return Object.assign({ author }, article._doc);
        }));

        return {
            status: true,
            articles
        };
    } catch (err) {
        console.log(err);

        return {
            status: false
        }
    }
}

const deleteArticle = async id => {
    try {
        const comments = await NewsComment.find({ articleId: id });

        for (const commentId of comments) {
            await NewsReply.deleteMany({ commentId });

            await NewsComment.findByIdAndDelete(commentId);
        }

        await NewsArticle.findByIdAndDelete(id);

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

const publish = async id => {
    try {
        await NewsArticle.findByIdAndUpdate(id, { isDraft: false });

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

const edit = async body => {
    try {
        const {
            id,
            title,
            path,
            content
        } = body;

        const titleArticle = await NewsArticle.find({ title });

        if (titleArticle.length === 1 && !titleArticle[0]._id.equals(id)) return { error: 'Title is already taken' };

        const pathArticle = await NewsArticle.find({ path });

        if (pathArticle.length === 1 && !pathArticle[0]._id.equals(id)) return { error: 'Path is already taken' };

        await NewsArticle.findByIdAndUpdate(id, { title, path, content, lastEditedDate: Date.now() });

        return { path };
    } catch (err) {
        console.log(err);

        return {
            error: '505'
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
    getUserArticles,
    getAllNewsArticlesWithAuthor,
    deleteArticle,
    publish,
    edit
}