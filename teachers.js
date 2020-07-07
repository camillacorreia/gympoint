const fs = require('fs');
const data = require('./data.json');
// show
exports.show = function(req,res) {
    const { id } = req.params;

    const foundTeacher = data.teachers.find(function(teacher){
        return teacher.id == id
    });   

    if (!foundTeacher) {
        return res.send("Instrutor não encontrado");
    }

    return res.send(foundTeacher);
}

// create
exports.post = function (req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
        if (req.body[key] === "") {
            return res.send('Por favor, preencha o campo')
        }
    }

    let { avatar_url, birth, name, gender, acting } = req.body;

    birth = Date.parse(birth);
    const created_at = Date.now();
    const id = Number(data.teachers.length + 1);

    data.teachers.push({
        avatar_url,
        birth,
        name, 
        gender,
        acting,
        created_at
    });

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("Write file error");

        return res.redirect("/teachers");
    });
};

// update

// delete