const express = require('express');
const {
    getChats,
    create,
    getChat,
    send,
    getMessages,
    getUnreadCount,
    startANewChat
} = require('../controllers/chatController');

const router = express();

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const result = await getChat(id);

    res.send(result)
})

router.get('/getChats/:userId', async (req, res) => {
    const userId = req.params.userId;
    const result = await getChats(userId);

    res.send(result);
});

router.get('/:id/getMessages/:userId', async (req, res) => {
    const { id, userId } = req.params;
    const result = await getMessages(id, userId);

    res.send(result);
});

router.post('/start', async (req, res) => {
    const result = await create(req.body);

    res.send(result);
});

router.post('/send', async (req, res) => {
    const result = await send(req.body);

    res.send(result);
});

router.get('/getUnreadCount/:userId', async (req, res) => {
    const { userId } = req.params;
    const result = await getUnreadCount(userId);

    res.send(result);
});

router.post('/startANewChat', async (req, res) => {
    const result = await startANewChat(req.body);

    res.send(result);
});

module.exports = router;
