const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

module.exports = app => {
    app.use(cors());

    app.use(cookieParser());

    app.use(express.json({ limit: '50mb' }));
    app.use(express.urlencoded({ limit: '50mb', extended: true }));

    app.use(express.static('static'));
}
