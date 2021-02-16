const express = require('express');
const {
    addEducation,
    getEducations
} = require('../controllers/educationController');

const router = express();

router.get('/:username/getEducations', async (req, res) => {
    const username = req.params.username;
    const result = await getEducations(username);

    res.send(result);
});

router.post('/add', async (req, res) => {
    const result = await addEducation(req.body);

    res.send({ status: result });
});

module.exports = router;
