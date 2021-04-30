const express = require('express');
const {
    addWork,
    getWorkExperiences,
    deleteWork,
    editWork
} = require('../controllers/workController');

const router = express();

router.get('/u/:username', async (req, res) => {
    const username = req.params.username;
    const result = await getWorkExperiences(username);

    res.send(result);
});

router.post('/add', async (req, res) => {
    const result = await addWork(req.body);

    res.send(result);
});

router.post('/delete/:id', async (req, res) => {
    const id = req.params.id;
    const result = await deleteWork(id);

    res.send(result);
});

router.post('/edit', async (req, res) => {
    const body = req.body;
    const results = await editWork(body);

    res.send(results);
})

module.exports = router;
