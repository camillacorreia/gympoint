const { Pool } = require("pg");

module.exports = new Pool({
    user: 'postgres',
    password: "21911Cc@",
    host: "localhost",
    port: 5432,
    database: "gympoint"
});