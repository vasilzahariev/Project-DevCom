const express = require('express');
const {
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
    publish
} = require('../controllers/newsController');
const { getUserById } = require('../controllers/authController');

const router = express();

router.get('/', async (req, res) => {
    const result = await getAllNewsArticles();

    res.send(result);
});

router.get('/n/:path', async (req, res) => {
    const path = req.params.path;
    const result = await getNewsArticle(path);
    result.author = await getUserById(result.article.authorId);

    res.send(result);
})

router.post('/create', async (req, res) => {
    const result = await createArticle(req);

    res.send(result);
})

router.post('/addComment', async (req, res) => {
    const body = req.body;
    const result = await addComment(body);

    res.send(result);
});

router.get('/:articleId/getComments', async (req, res) => {
    const articleId = req.params.articleId;
    const comments = await getNewsArticleComments(articleId);
    const result = [];

    for (const comment of comments) {
        const user = await getUserById(comment.commentatorId);

        result.push({
            comment,
            user
        })
    }

    res.send(result);
});

router.post('/addReply', async (req, res) => {
    const body = req.body;
    const result = await addReply(body);

    res.send(result);
});

router.get('/comment/:commentId/getReplies', async (req, res) => {
    const id = req.params.commentId;
    const result = await getReplies(id);

    res.send(result);
});

router.get('/getUserArticles/', async (req, res) => {
    const result = await getAllNewsArticlesWithAuthor();

    res.send(result);
});

router.get('/getUserArticles/:username', async (req, res) => {
    const username = req.params.username;
    const result = await getUserArticles(username);

    res.send(result);
});

router.post('/delete/:id', async (req, res) => {
    const id = req.params.id;
    const result = await deleteArticle(id);

    res.send(result);
});

router.post('/publish/:id', async (req, res) => {
    const id = req.params.id;
    const result = await publish(id);

    res.send(result);
});

module.exports = router;
