const NewsArticle = require('../models/NewsArticle');
const NewsComment = require('../models/NewsComment');

const getAllNewsArticles = async () => {
    return await NewsArticle.find();
}

const getNewsArticleAndComments = async (path) => {
    const article = await NewsArticle.findOne({ path: path });

    console.log(article);

    //const comments = await NewsComment.find({ articleId: article._id });
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

    } catch(err) {
        console.log(err);

        return { error: '500' }
    }
}

module.exports = {
    getAllNewsArticles,
    getNewsArticleAndComments,
    createArticle
}