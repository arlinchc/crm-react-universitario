require("dotenv").config();
const { Pool } = require("pg");

let pool;

if (process.env.DATABASE_URL) {
  // Producción (Render)
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
} else {
  // Desarrollo local
  pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
  });
}

// Test de conexión
pool.connect()
  .then(() => console.log("✅ Conectado a PostgreSQL"))
  .catch(err => console.error("❌ Error de conexión:", err));

module.exports = pool;