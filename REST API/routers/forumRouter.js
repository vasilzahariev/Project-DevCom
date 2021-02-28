const express = require('express');
const {
    create,
    getForumByName,
    createPost,
    getForumPost,
    addComment,
    deleteComment,
    likeComment,
    dislikeComment,
    likePost,
    dislikePost,
    deletePost,
    editPost,
    setAnswer,
    editComment,
    edit,
    join,
    leave,
    addMods,
    getUserForumFeed,
    getAllForums
} = require('../controllers/forumController')

const router = express();

router.post('/create', async (req, res) => {
    const result = await create(req.body);

    res.send(result);
});

router.post('/edit', async (req, res) => {
    const result = await edit(req.body);

    res.send(result);
});

router.get('/f/:name', async (req, res) => {
    const name = req.params.name;
    const result = await getForumByName(name);
    
    res.send(result);
});

router.post('/createPost', async (req, res) => {
    const result = await createPost(req.body);

    res.send(result);
});

router.get('/f/:name/:postId', async (req, res) => {
    const { name, postId } = req.params;
    const result = await getForumPost(name, postId);

    res.send(result);
});

router.post('/addComment', async (req, res) => {
    const result = await addComment(req.body);

    res.send(result);
});

router.post('/deleteComment', async (req, res) => {
    const result = await deleteComment(req.body.commentId);

    res.send(result);
});

router.post('/likeComment/:id', async (req, res) => {
    const id = req.params.id;
    const result = await likeComment(req.body, id);

    res.send(result);
});

router.post('/dislikeComment/:id', async (req, res) => {
    const id = req.params.id;
    const result = await dislikeComment(req.body, id);

    res.send(result);
});

router.post('/likePost/:id', async (req, res) => {
    const id = req.params.id;
    const result = await likePost(req.body, id);

    res.send(result);
});

router.post('/dislikePost/:id', async (req, res) => {
    const id = req.params.id;
    const result = await dislikePost(req.body, id);

    res.send(result);
});

router.post('/deletePost/:id', async (req, res) => {
    const id = req.params.id;
    const result = await deletePost(id);

    res.send(result);
});

router.post('/editPost', async (req, res) => {
    const result = await editPost(req.body);

    res.send(result);
});

router.post('/answer', async (req, res) => {
    const result = await setAnswer(req.body);

    res.send(result);
});

router.post('/editComment', async (req, res) => {
    const result = await editComment(req.body);

    res.send(result);
});

router.post('/join', async (req, res) => {
    const result = await join(req.body);

    res.send(result);
});

router.post('/leave', async (req, res) => {
    const result = await leave(req.body);

    res.send(result);
});

router.post('/addMods', async (req, res) => {
    const result = await addMods(req.body);

    res.send(result);
});

router.get('/getUserForumFeed/:id', async (req, res) => {
    const id = req.params.id;
    const result = await getUserForumFeed(id);

    res.send(result);
});

router.get('/', async (req, res) => {
    const result = await getAllForums();

    res.send(result);
});

module.exports = router;
