const env = process.env.NODE_ENV || 'development';

const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/config')[env];

const app = express();

// Setting up connection with the database
mongoose.connect(config.dbConnectionUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) {
        console.log(err);

        throw err;
    }

    console.log('Database is setup and running!');
});

// Configuring the app, so that it uses modules
require('./config/express')(app);

// Binds and listens for connections on the specific port
app.listen(config.PORT, console.log(`REST API is listening on http://localhost:${config.PORT}`));
