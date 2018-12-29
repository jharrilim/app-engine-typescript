import express = require('express');

const port = Number(process.env.PORT) || 8080;

const app = express();
app.enable('trust proxy');


const server = app.use('/', (req, res, next) => {
    res.status(200).send('Hello Google App Engine');
}).listen(port);
