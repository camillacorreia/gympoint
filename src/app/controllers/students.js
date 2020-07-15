const Student = require('../models/student');
const { age, date } = require('../../lib/utils');
const db = require('../../config/db');

module.exports = {
    index(req, res){

        Student.all(function(students) {

            return res.render("students/index", { students });

        })

    },
    create(req, res) {

        Student.teachersSelectOptions(function(options) {
            return res.render('students/create', {teacherOptions: options});
        })

    },
    post(req, res) {

        const keys = Object.keys(req.body);

        for (key of keys) {
            if (req.body[key] === "") {
                return res.send('Por favor, preencha o campo')
            }
        }

        Student.create(req.body, function(student) {
            return res.redirect(`/students/${student.id}`);
        });

    },
    show(req, res) {

        Student.find(req.params.id, function(student){
            if (!student) return res.send("Instrutor não encontrado!")

            student.birth = date(student.birth).birthDay;
            student.created_at = date(student.created_at).created;

            return res.render("students/show", { student });
        });

    },
    edit(req, res) {

        Student.find(req.params.id, function(student){
            if (!student) return res.send("Instrutor não encontrado!")

            student.birth = date(student.birth).iso;

            Student.teachersSelectOptions(function(options) {
                return res.render('students/edit', { student, teacherOptions: options });
            })

        });

    },
    put(req, res) {
        const keys = Object.keys(req.body);

        for (key of keys) {
            if (req.body[key] === "") {
                return res.send('Por favor, preencha o campo')
            }
        }

        Student.update(req.body, function() {
            return res.redirect(`/students/${req.body.id}`);
        });
    },
    delete(req, res) {
        Student.delete(req.body.id, function() {
            return res.redirect(`/students`);
        });
    }
}
