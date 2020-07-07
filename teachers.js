const fs = require('fs');

// create
exports.post = function (req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
        if (req.body[key] === "") {
            return res.send('Por favor, preencha o campo')
        }
    }

    fs.writeFile("data.json", JSON.stringify(req.body), function(err) {
        if (err) return res.send("Write file error");

        return res.redirect("/teachers");
    });
};

// update

//delete