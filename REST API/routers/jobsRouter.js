const express = require('express');
const {
    createJob,
    getJobs,
    closeJob,
    getUserJobs,
    openJob
} = require('../controllers/jobsController');

const router = express();

router.get('/', async (req, res) => {
    const result = await getJobs();

    res.send(result.filter(job => !job.isClosed));
});

router.post('/create', async (req, res) => {
    const body = req.body;

    const result = await createJob(body);

    res.send(result);
});

router.post('/close/:id', async (req, res) => {
    const id = req.params.id;
    const result = await closeJob(id);

    res.send(result);
});

router.post('/open/:id', async (req, res) => {
    const id = req.params.id;
    const result = await openJob(id);

    res.send(result);
});

router.get('/getUserJobs/:username', async (req, res) => {
    const username = req.params.username;
    const result = await getUserJobs(username);

    res.send(result);
});

module.exports = router;
