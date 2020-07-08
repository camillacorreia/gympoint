const fs = require('fs');
const data = require('../data.json');
const { age, date } = require('../utils');

//index
exports.index  = function(req, res) {

    return res.render("students/index", { students: data.students });
};

// show
exports.show = function(req,res) {
    const { id } = req.params;

    const foundStudent = data.students.find(function(student){
        return student.id == id
    });   

    if (!foundStudent) {
        return res.send("Instrutor não encontrado");
    }

    const student = {
        ...foundStudent,
        age: age(foundStudent.birth), 
        created_at: new Intl.DateTimeFormat('pt-BR').format(foundStudent.created_at),
    }

    return res.render("students/show", { student });
};

// create
exports.create = function (req, res) {
    return res.render('students/create');
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
    const id = Number(data.students.length + 1);

    actings = [].concat(actings);

    data.students.push({
        avatar_url,
        birth,
        name, 
        gender,
        actings,
        created_at,
        id
    });


    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("Write file error");

        return res.redirect(`/students/${id}`);
    });
};

// edit
exports.edit = function (req, res) {
    const { id } = req.params;

    const foundStudent = data.students.find(function(student){
        return student.id == id
    });   

    if (!foundStudent) {
        return res.send("Instrutor não encontrado");
    }

    const student = {
        ...foundStudent,
        birth: date(foundStudent.birth),
    }

    return res.render('students/edit', { student });
};

// put
exports.put = function (req, res) {
    const { id } = req.body;
    let index = 0;

    const foundStudent = data.students.find(function(student, foundIndex){
        if (id == student.id) {
            index = foundIndex
            return true
        }
    });   

    if (!foundStudent) {
        return res.send("Instrutor não encontrado");
    };

    const student = {
        ...foundStudent,
        ...req.body,
        actings: [].concat(req.body.actings),
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    };

    data.students[index] = student;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("Write file error");

        return res.redirect(`/students/${id}`)
    });
};

// delete
exports.delete = function (req, res) {
    const { id } = req.body;

    const filteredStudents = data.students.filter(function(student){
        return student.id != id;
    });

    data.students = filteredStudents;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("Write file error");

        return res.redirect('/students');
    });
};