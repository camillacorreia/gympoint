const db = require ('../../config/db');
const { age, date } = require('../../lib/utils');

module.exports = {
    all(callback) {
        db.query(`SELECT * FROM teachers`, function(err, results) {
            if(err) throw `"Database Error!" ${err}`;

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
            if(err) throw `"Database Error!" ${err}`;

            callback(results.rows[0]);
        });
    },

    find(id, callback) {
        db.query(`
            SELECT *
            FROM teachers
            WHERE id = $1`, [id], function(err, results) {
                if(err) `"Database Error!" ${err}`;

                callback(results.rows[0]);
        })
    },

    update(data, callback) {
        const query = `
            UPDATE teachers SET
            avatar_url=($1),
            name=($2),
            birth=($3),
            gender=($4),
            actings=($5)
        WHERE id = $6
        `

        const values = [
            data.avatar_url,
            data.name,
            date(data.birth).iso,
            data.gender,
            data.id
        ]

        db.query(query, values, function(err, results) {
            if(err) `"Database Error!" ${err}`;

            callback();
        });
    }
}