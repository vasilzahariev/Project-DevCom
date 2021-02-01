const express = require('express');
const {
    createJob,
    getJobs
} = require('../controllers/jobsController');

const router = express();

router.get('/', async (req, res) => {
    const result = await getJobs();

    res.send(result);
});

router.post('/create', async (req, res) => {
    const body = req.body;

    const result = await createJob(body);

    res.send(result);
});

module.exports = router;
