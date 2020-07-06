const express = require('express');
const nunjunks = require('nunjucks');

const server = express();

server.use(express.static('public'));

server.set('view engine', 'njk');

nunjunks.configure('views', {
    express: server,
    noCache: true
});

server.get('/', (req, res) => {
    return res.render('layout');
});

server.listen(5002);