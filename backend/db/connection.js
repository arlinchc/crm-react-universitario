const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "crmUniversity",
    password: "2935327",
    port: 5432
});

module.exports = pool;