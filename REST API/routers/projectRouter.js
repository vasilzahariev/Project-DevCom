const express = require('express');
const {
    create,
    getProjects,
    getProjectByUrl,
    edit,
    addMember,
    addDevlog,
    getUserDevlogs,
    getDevlogs,
    publish,
    deleteDevlog,
    editDevlog,
    getProjectsAndUsers,
    deleteProject,
    getAllProjects
} = require('../controllers/projectController');

const router = express();

router.get('/', async (req, res) => {
    const result = await getAllProjects();

    res.send(result);
});

router.post('/create', async (req, res) => {
    const result = await create(req.body);

    res.send(result);
});

router.get('/u/:username', async (req, res) => {
    const username = req.params.username;
    const result = await getProjects(username);
    
    res.send(result);
});

router.get('/p/:url', async (req, res) => {
    const url = req.params.url;
    const result = await getProjectByUrl(url);

    res.send(result);
});

router.post('/p/:id/edit', async (req, res) => {
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

router.get('/getUserDevlogs/', async (req, res) => {
    const result = await getDevlogs();

    res.send(result);
});

router.get('/getUserDevlogs/:username', async (req, res) => {
    const username = req.params.username;
    const result = await getUserDevlogs(username);

    res.send(result);
});

router.post('/publish/:id', async (req, res) => {
    const id = req.params.id;
    const result = await publish(id);

    res.send(result);
});

router.post('/deleteDevlog/:id', async (req, res) => {
    const id = req.params.id;
    const result = await deleteDevlog(id);

    res.send(result);
});

router.post('/devlog/edit', async (req, res) => {
    const result = await editDevlog(req.body);

    res.send(result);
});

router.get('/getProjectsAndUsers', async (req, res) => {
    const result = await getProjectsAndUsers();

    res.send(result);
});

router.post('/deleteProject/:id', async (req, res) => {
    const id = req.params.id;
    const result = await deleteProject(id);

    res.send(result);
});

module.exports = router;
