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
                teacher_id,
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
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
            data.teacher,
            date(Date.now()).iso,
        ]

        db.query(query, values, function(err, results) {
            if(err) throw `Database Error! ${err}`;

            callback(results.rows[0]);
        });
    },

    find(id, callback) {
        db.query(`
            SELECT students.*, teachers.name AS teacher_name
            FROM students
            LEFT JOIN teachers ON (students.teacher_id = teachers.id)
            WHERE students.id = $1`, [id], function(err, results) {
                if(err) `Database Error! ${err}`;

                callback(results.rows[0]);
        })
    },

    findBy(filter, callback) {
        db.query(`SELECT *
        FROM students
        WHERE students.name ILIKE '%${filter}%'
        OR students.register ILIKE '%${filter}%'
        ORDER BY name ASC`, function(err, results) {
            if(err) throw `Database Error! ${err}`;

            callback(results.rows);
        });
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
            register=($12),
            teacher_id=($13)
        WHERE id = $14
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
            data.teacher,
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
    },
    teachersSelectOptions(callback) {
        db.query(`SELECT name, id FROM teachers`, function(err, results) {
            if(err) `Database Error! ${err}`;

            callback(results.rows);
        });
    }
}