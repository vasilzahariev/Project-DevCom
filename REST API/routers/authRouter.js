const express = require('express');
const {
    register,
    login,
    verifyToken
} = require('../controllers/authController');

const router = express();

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
})

module.exports = router;
