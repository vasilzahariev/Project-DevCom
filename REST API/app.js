const env = process.env.NODE_ENV || 'development';

const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/config')[env];

const app = express();

// Setting up connection with the database
// TODO

// Making the app listen on a specific port
app.listen(config.PORT, console.log(`REST API is listening on http://localhost:${config.PORT}`));
