const Teacher = require('../models/teacher');

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

    },
    edit(req, res) {

    },
    put(req, res) {

    },
    delete(req, res) {

    }
}
