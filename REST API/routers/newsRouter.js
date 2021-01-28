const express = require('express');
const {
    getAllNewsArticles,
    getNewsArticle,
    getNewsArticleComments,
    createArticle,
    addComment,
    addReply,
    getReplies
} = require('../controllers/newsController');
const { getUserById } = require('../controllers/authController');

const router = express();

router.get('/', async (req, res) => {
    const result = await getAllNewsArticles();

    res.send(result);
});

router.get('/:path', async (req, res) => {
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

module.exports = router;
