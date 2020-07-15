const Teacher = require('../models/teacher');
const { age, date } = require('../../lib/utils');
const student = require('../models/student');

module.exports = {
    index(req, res) {
        let { filter, page, limit } = req.query;

        page = page || 1
        limit = limit || 5
        let offset = limit * (page - 1)

        const params = {
            filter,
            page,
            limit,
            offset,
            callback(teachers) {
                return res.render("teachers/index", { teachers, filter });
            }
        }

        Teacher.paginate(params);

        //if ( filter ) {
        //    Teacher.findBy(filter, function(teachers) {
        //        return res.render("teachers/index", { teachers, filter });
        //    })
        //} else {
        //    Teacher.all(function(teachers) {

         //       return res.render("teachers/index", { teachers });
    
        //    });
        //}

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
            teacher.actings = (teacher.actings).split(",");

            return res.render("teachers/show", { teacher });
        });

    },
    edit(req, res) {

        Teacher.find(req.params.id, function(teacher){
            if (!teacher) return res.send("Instrutor não encontrado!")

            teacher.birth = date(teacher.birth).iso;

            return res.render("teachers/edit", { teacher });
        });

    },
    put(req, res) {
        const keys = Object.keys(req.body);

        for (key of keys) {
            if (req.body[key] === "") {
                return res.send('Por favor, preencha o campo')
            }
        }

        Teacher.update(req.body, function() {
            return res.redirect(`/teachers/${req.body.id}`);
        });
    },
    delete(req, res) {
        Teacher.delete(req.body.id, function() {
            return res.redirect(`/teachers`);
        });
    }
}
