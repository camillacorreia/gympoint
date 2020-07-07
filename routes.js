const express = require('express');
const routes = express.Router();

routes.get('/', (req, res) => {
    return res.render('layout');
});

routes.get('/login', (req, res) => {
    return res.render('login');
});

routes.post('/login', (req, res) => {
    return res.render('login');
});

routes.get('/teachers', (req, res) => {
    return res.render('teachers/index');
});

routes.get('/teachers/create', (req, res) => {
    return res.render('teachers/create');
});

routes.post('/teachers/create', (req, res) => {
    return res.render('teachers/create');
});

routes.get('/students', (req, res) => {
    return res.render('students/index');
});

module.exports = routes;