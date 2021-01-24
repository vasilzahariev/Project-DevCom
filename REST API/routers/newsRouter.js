const express = require('express');
const {
    getAllNewsArticles,
    getNewsArticleAndComments,
    createArticle
} = require('../controllers/newsController');

const router = express();

router.get('/', async (req, res) => {
    const result = await getAllNewsArticles();

    res.send(result);
});

router.get('/:path', async (req, res) => {
    // TODO: Get the path
    //const result = await getNewsArticleAndComments(path);
})

router.post('/create', async (req, res) => {
    const result = await createArticle(req);

    res.send(result);
})

module.exports = router;
