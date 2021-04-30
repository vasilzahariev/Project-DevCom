const express = require('express');
const {
    addEducation,
    getEducations,
    deleteEducation,
    editEducation
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

router.post('/deleteEducation/:id', async (req, res) => {
    const result = await deleteEducation(req.params.id);

    res.send(result);
})

router.post('/edit', async (req, res) => {
    const result = await editEducation(req.body);

    res.send(result);
})

module.exports = router;
