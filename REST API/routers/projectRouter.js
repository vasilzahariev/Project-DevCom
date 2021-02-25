const express = require('express');
const {
    create,
    getProjects,
    getProjectByUrl,
    edit,
    addMember,
    addDevlog,
    getUserDevlogs
} = require('../controllers/projectController');

const router = express();

router.post('/create', async (req, res) => {
    const result = await create(req.body);

    res.send(result);
});

router.get('/u/:username', async (req, res) => {
    const username = req.params.username;
    const result = await getProjects(username);
    
    res.send(result);
});

router.get('/:url', async (req, res) => {
    const url = req.params.url;
    const result = await getProjectByUrl(url);

    res.send(result);
});

router.post('/:id/edit', async (req, res) => {
    const id = req.params.id;
    const result = await edit(id, req.body);

    res.send(result);
});

router.post('/addMember', async (req, res) => {
    const result = await addMember(req.body.projectId, req.body.username);

    res.send(result);
});

router.post('/addDevlog', async (req, res) => {
    const result = await addDevlog(req.body);

    res.send(result);
});

router.get('/getUserDevlogs/:username', async (req, res) => {
    const username = req.params.username;
    const result = await getUserDevlogs(username);

    res.send(result);
});

module.exports = router;
