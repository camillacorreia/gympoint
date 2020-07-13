const db = require ('../../config/db');
const { age, date } = require('../../lib/utils');

module.exports = {
    all(callback) {
        db.query(`SELECT * FROM teachers`, function(err, results) {
            if(err) return res.send("Database Error!");

            callback(results.rows);
        });
    },

    create(data, callback) {
        const query = `
            INSERT INTO teachers (
                avatar_url,
                name,
                gender,
                actings,
                birth, 
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id
        `

        const values = [
            data.avatar_url,
            data.name,
            data.gender,
            data.actings,
            date(data.birth).iso,
            date(Date.now()).iso,
        ]

        db.query(query, values, function(err, results) {
            if(err) return console.log(err);

            callback(results.rows[0]);
        });
    }
}