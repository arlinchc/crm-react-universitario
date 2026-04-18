require("dotenv").config();


console.log("USER:", process.env.DB_USER);
console.log("PASS:", process.env.DB_PASSWORD);
console.log("DB:", process.env.DB_NAME);
console.log("HOST:", process.env.DB_HOST);
console.log("PORT:", process.env.DB_PORT);
const { Pool } = require("pg");

let pool;

if (process.env.DATABASE_URL) {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
} else {
  pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
  });
}


// debug conexión
pool.connect()
  .then(() => console.log("✅ Conectado a PostgreSQL"))
  .catch(err => console.error("❌ Error de conexión:", err));

module.exports = pool;