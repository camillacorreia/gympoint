const Teacher = require('../models/teacher');
const { age, date } = require('../../lib/utils');

module.exports = {
    index(req, res){

        Teacher.all(function(teachers) {

            return res.render("teachers/index", { teachers });

        })

    },
    create(req, res) {

        return res.render('teachers/create');

    },
    post(req, res) {

        const keys = Object.keys(req.body);

        for (key of keys) {
            if (req.body[key] === "") {
                return res.send('Por favor, preencha o campo')
            }
        }

        Teacher.create(req.body, function(teacher) {
            return res.redirect(`/teachers/${teacher.id}`);
        });

    },
    show(req, res) {
        Teacher.find(req.params.id, function(teacher){
            if (!teacher) return res.send("Instrutor não encontrado!")

            teacher.age = age(teacher.birth);
            teacher.created_at = date(teacher.created_at).created;

            return res.render("teachers/show", { teacher });
        });

    },
    edit(req, res) {

    },
    put(req, res) {

    },
    delete(req, res) {

    }
}
