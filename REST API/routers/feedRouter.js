const express = require('express');
const {
    addPost,
    getUserFeed,
    like,
    comment,
    getComments
} = require('../controllers/feedController');

const router = express();

router.get('/:username', async (req, res) => {
    const username = req.params.username;
    const result = await getUserFeed(username);
    
    res.send(result);
})

router.post('/add', async (req, res) => {
    const result = await addPost(req.body);

    res.send(result);
})

router.post('/like', async (req, res) => {
    await like(req.body);
});

router.post('/comment', async (req, res) => {
    const result = await comment(req.body);

    res.send(result);
})

router.get('/:postId/getComments', async (req, res) => {
    const postId = req.params.postId;
    const result = await getComments(postId);

    res.send(result);
});

module.exports = router;
