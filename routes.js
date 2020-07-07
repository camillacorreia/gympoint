const express = require('express');
const routes = express.Router();
const teachers = require('./teachers');

routes.get('/', (req, res) => {
    return res.render('login');
});

routes.get('/teachers', (req, res) => {
    return res.render('teachers/index');
});

routes.get('/teachers/create', (req, res) => {
    return res.render('teachers/create');
});

routes.get('/teachers/:id', teachers.show);

routes.post('/teachers/create', teachers.post);

routes.get('/students', (req, res) => {
    return res.render('students/index');
});

module.exports = routes;