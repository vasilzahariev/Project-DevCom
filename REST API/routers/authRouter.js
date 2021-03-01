const express = require('express');
const {
    register,
    login,
    verifyToken,
    getUserById,
    checkIfUsernameExists,
    getUserByUsername,
    getUserInformation,
    updateUserInfo,
    getAllUsers,
    setRole
} = require('../controllers/authController');

const router = express();

router.get('/', async (req, res) => {
    const result = await getAllUsers();

    res.send(result);
});

router.post(`/register`, async (req, res) => {
    const result = await register(req.body);

    res.send(result);
});

router.post(`/login`, async (req, res) => {
    const result = await login(req.body);

    res.send(result);
})

router.get(`/verifyToken`, async (req, res) => {
    const token = req.header('Authentication');

    const result = await verifyToken(token);

    res.send(result);
});

router.get('/u/:id', async (req, res) => {
    const id = req.params.id;
    const result = await getUserById(id);

    res.send(result);
});

router.get('/isUser/:username', async (req, res) => {
    const username = req.params.username;
    const result = await checkIfUsernameExists(username);

    res.send(result);
});

router.get('/getUserByUsername/:username', async (req, res) => {
    const username = req.params.username;
    const result = await getUserByUsername(username);

    res.send(result);
});

router.get('/getUserInformation/:username', async (req, res) => {
    const username = req.params.username;
    const result = await getUserInformation(username);

    res.send(result);
});

router.post('/updateUserInformation', async (req, res) => {
    const result = await updateUserInfo(req.body);

    res.send(result)
});

router.post('/setRole', async (req, res) => {
    const result = await setRole(req.body);

    res.send(result);
});

module.exports = router;
