const db = require ('../../config/db');
const { date } = require('../../lib/utils');

module.exports = {
    all(callback) {
        db.query(`SELECT *
        FROM students
        ORDER BY name ASC`, function(err, results) {
            if(err) throw `Database Error! ${err}`;

            callback(results.rows);
        });
    },

    create(data, callback) {
        const query = `
            INSERT INTO students (
                avatar_url,
                name,
                adress,
                number,
                email,
                birth,
                gender,
                blood,
                weight,
                height,
                plan,
                register,
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
            RETURNING id
        `

        const values = [
            data.avatar_url,
            data.name,
            data.adress,
            data.number,
            data.email,
            date(data.birth).iso,
            data.gender,
            data.blood,
            data.weight,
            data.height,
            data.plan,
            data.register,
            date(Date.now()).iso,
        ]

        db.query(query, values, function(err, results) {
            if(err) throw `Database Error! ${err}`;

            callback(results.rows[0]);
        });
    },

    find(id, callback) {
        db.query(`
            SELECT *
            FROM students
            WHERE id = $1`, [id], function(err, results) {
                if(err) `Database Error! ${err}`;

                callback(results.rows[0]);
        })
    },

    update(data, callback) {
        const query = `
            UPDATE students SET
            avatar_url=($1),
            name=($2),
            adress=($3),
            number=($4),
            email=($5),
            birth=($6),
            gender=($7),
            blood=($8),
            weight=($9),
            height=($10),
            plan=($11),
            register=($12)
        WHERE id = $13
        `

        const values = [
            data.avatar_url,
            data.name,
            data.adress,
            data.number,
            data.email,
            date(data.birth).iso,
            data.gender,
            data.blood,
            data.weight,
            data.height,
            data.plan,
            data.register,
            data.id
        ]

        db.query(query, values, function(err, results) {
            if(err) `Database Error! ${err}`;

            callback();
        });
    },

    delete(id, callback) {
        db.query(`DELETE FROM students WHERE id = $1`, [id], function(err, results) {
            if(err) `Database Error! ${err}`;

            return callback();
        });
    }
}