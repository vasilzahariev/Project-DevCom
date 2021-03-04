const env = process.env.NODE_ENV || 'development';

const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/config')[env];
const authRouter = require('./routers/authRouter');
const newsRouter = require('./routers/newsRouter');
const jobsRouter = require('./routers/jobsRouter');
const educationRouter = require('./routers/educationRouter');
const workRouter = require('./routers/workRouter');
const feedRouter = require('./routers/feedRouter');
const projectRouter = require('./routers/projectRouter');
const chatRouter = require('./routers/chatRouter');
const forumRouter = require('./routers/forumRouter');
const imgRouter = require('./routers/imgRouter');

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

app.use('/auth', authRouter);
app.use('/news', newsRouter);
app.use('/jobs', jobsRouter);
app.use('/edu', educationRouter);
app.use('/work', workRouter);
app.use('/feed', feedRouter);
app.use('/project', projectRouter);
app.use('/chat', chatRouter);
app.use('/forum', forumRouter);
app.use('/img', imgRouter);

// Binds and listens for connections on the specific port
app.listen(config.PORT, console.log(`REST API is listening on http://localhost:${config.PORT}`));
