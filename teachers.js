const fs = require('fs');
const data = require('./data.json');
const { age, date } = require('./utils');

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
        created_at: new Intl.DateTimeFormat('pt-BR').format(foundTeacher.created_at),
    }

    return res.render("teachers/show", { teacher });
}

// create
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

        return res.redirect(`/teachers/${id}`);
    });
};

// editar
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
        birth: date(foundTeacher.birth),
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
        birth: Date.parse(req.body.birth)
    };

    data.teachers[index] = teacher;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("Write file error");

        return res.redirect(`/teachers/${id}`)
    });
};