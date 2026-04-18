const pool = require("../db/connection");

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> feature-axel
const getAllLeads = async () => {
  const result = await pool.query(
    "SELECT * FROM leads ORDER BY id DESC"
  );
  return result.rows;
};

const createLead = async (lead) => {
<<<<<<< HEAD

  const { full_name, program_interest, phone, email, status, advisor } = lead;

  const result = await pool.query(
    `INSERT INTO leads
      (full_name, program_interest, phone, email, status, advisor)
       VALUES ($1,$2,$3,$4,$5,$6)
      RETURNING *`,
=======
  const {
    full_name,
    program_interest,
    phone,
    email,
    status,
    advisor,
  } = lead;

  const result = await pool.query(
    `
    INSERT INTO leads
    (full_name, program_interest, phone, email, status, advisor)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
    `,
>>>>>>> feature-axel
    [full_name, program_interest, phone, email, status, advisor]
  );

  return result.rows[0];
};

module.exports = {
  getAllLeads,
<<<<<<< HEAD
  createLead
};
=======
const mapToES = {
  Prospect: "Prospecto",
  Contacted: "Contactado",
  Confirmed: "Confirmado",
  Enrolled: "Inscrito",
};

const mapToEN = {
  Prospecto: "Prospect",
  Contactado: "Contacted",
  Confirmado: "Confirmed",
  Inscrito: "Enrolled",
};

const normalize = (l) => ({ ...l, status: mapToES[l.status] || l.status });

// Aquí se hace la conexión real con la tabla leads.
// El updateStatus guarda en la BD el nuevo estado y luego lo regresa normalizado en español.

exports.getAll = async () => {
  const r = await pool.query("SELECT * FROM leads ORDER BY id DESC");
  return r.rows.map(normalize);
};

exports.getById = async (id) => {
  const r = await pool.query("SELECT * FROM leads WHERE id=$1", [id]);
  return r.rows[0] ? normalize(r.rows[0]) : null;
};

exports.updateStatus = async (id, status) => {
  const dbStatus = mapToEN[status] || status;
  const r = await pool.query(
    "UPDATE leads SET status=$1 WHERE id=$2 RETURNING *",
    [dbStatus, id]
  );
  return r.rows[0] ? normalize(r.rows[0]) : null;
};
>>>>>>> feature-Ulises
=======
  createLead,
};
>>>>>>> feature-axel
