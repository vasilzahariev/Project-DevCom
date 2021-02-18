const express = require('express');
const {
    addWork,
    getWorkExperiences
} = require('../controllers/workController');

const router = express();

router.get('/:username', async (req, res) => {
    const username = req.params.username;
    const result = await getWorkExperiences(username);

    res.send(result);
});

router.post('/add', async (req, res) => {
    const result = await addWork(req.body);

    res.send(result);
});

module.exports = router;
