const express = require('express');
const {
    uploadImg
} = require('../controllers/imgController');

const router = express();

router.post('/upload', async (req, res) => {
    const result = await uploadImg(req.body.file);

    res.send({ url: result})
})

module.exports = router;
