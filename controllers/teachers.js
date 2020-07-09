const fs = require('fs');
const data = require('../data.json');
const { age, date } = require('../utils');

//index
exports.index  = function(req, res) {
    return res.render("teachers/index", { teachers: data.teachers });
};

// show
exports.show = function(req,res) {
    const { id } = req.params;

    const foundTeacher = data.teachers.find(function(teacher){
        return teacher.id == id
    });   

    if (!foundTeacher) {
        return res.send("Instrutor não encontrado");
    }

    const teacher = {
        ...foundTeacher,
        age: age(foundTeacher.birth), 
        created_at: date(foundTeacher.created_at).created,
    }

    return res.render("teachers/show", { teacher });
};

// create
exports.create = function (req, res) {
    return res.render('teachers/create');
};

// post
exports.post = function (req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
        if (req.body[key] === "") {
            return res.send('Por favor, preencha o campo')
        }
    }

    let { avatar_url, birth, name, gender, actings } = req.body;

    birth = Date.parse(birth);
    const created_at = Date.now();
    const id = Number(data.teachers.length + 1);

    actings = [].concat(actings);

    data.teachers.push({
        id,
        avatar_url,
        birth,
        name, 
        gender,
        actings,
        created_at
    });


    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("Write file error");

        return res.redirect(`/teachers/${id}`);
    });
};

// edit
exports.edit = function (req, res) {
    const { id } = req.params;

    const foundTeacher = data.teachers.find(function(teacher){
        return teacher.id == id
    });   

    if (!foundTeacher) {
        return res.send("Instrutor não encontrado");
    }

    const teacher = {
        ...foundTeacher,
        birth: date(foundTeacher.birth).iso,
    }

    return res.render('teachers/edit', { teacher });
};

// put
exports.put = function (req, res) {
    const { id } = req.body;
    let index = 0;

    const foundTeacher = data.teachers.find(function(teacher, foundIndex){
        if (id == teacher.id) {
            index = foundIndex
            return true
        }
    });   

    if (!foundTeacher) {
        return res.send("Instrutor não encontrado");
    };

    const teacher = {
        ...foundTeacher,
        ...req.body,
        actings: [].concat(req.body.actings),
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    };

    data.teachers[index] = teacher;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("Write file error");

        return res.redirect(`/teachers/${id}`)
    });
};

// delete
exports.delete = function (req, res) {
    const { id } = req.body;

    const filteredTeachers = data.teachers.filter(function(teacher){
        return teacher.id != id;
    });

    data.teachers = filteredTeachers;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("Write file error");

        return res.redirect('/teachers');
    });
};