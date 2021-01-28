const express = require('express');
const {
    createJob
} = require('../controllers/jobsController');

const router = express();

router.post('/create', async (req, res) => {
    const body = req.body;

    const result = await createJob(body);

    res.send(result);
});

module.exports = router;
