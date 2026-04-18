/* eslint-env node */
const pool = require("../db/connection");

// ================== MAPEO STATUS ==================
const mapToEN = {
  Prospecto: "Prospect",
  Contactado: "Contacted",
  Confirmado: "Confirmed",
  Inscrito: "Enrolled",
};

const mapToES = {
  Prospect: "Prospecto",
  Contacted: "Contactado",
  Confirmed: "Confirmado",
  Enrolled: "Inscrito",
};

const normalize = (l) => ({
  ...l,
  status: mapToES[l.status] || l.status,
});

// ================== GET ALL ==================
const getAllLeads = async () => {
  const result = await pool.query("SELECT * FROM leads ORDER BY id DESC");
  return result.rows.map(normalize);
};

// ================== GET BY ID ==================
const getById = async (id) => {
  const result = await pool.query("SELECT * FROM leads WHERE id = $1", [id]);
  return result.rows[0] ? normalize(result.rows[0]) : null;
};

// ================== CREATE ==================
const createLead = async (lead) => {
  const {
    full_name,
    program_interest,
    phone,
    email,
    status = "Prospect",
    advisor,
  } = lead;

  const dbStatus = mapToEN[status] || status;

  const result = await pool.query(
    `INSERT INTO leads
     (full_name, program_interest, phone, email, status, advisor)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [full_name, program_interest, phone, email, dbStatus, advisor]
  );

  return normalize(result.rows[0]);
};

// ================== UPDATE COMPLETO ==================
const updateLead = async (id, lead) => {
  const {
    full_name,
    program_interest,
    phone,
    email,
    status,
    advisor,
  } = lead;

  const dbStatus = mapToEN[status] || status;

  const result = await pool.query(
    `UPDATE leads
     SET full_name=$1, program_interest=$2, phone=$3,
         email=$4, status=$5, advisor=$6
     WHERE id=$7
     RETURNING *`,
    [full_name, program_interest, phone, email, dbStatus, advisor, id]
  );

  return result.rows[0] ? normalize(result.rows[0]) : null;
};

// ================== UPDATE STATUS ==================
const updateStatus = async (id, status) => {
  const dbStatus = mapToEN[status] || status;

  const result = await pool.query(
    "UPDATE leads SET status=$1 WHERE id=$2 RETURNING *",
    [dbStatus, id]
  );

  return result.rows[0] ? normalize(result.rows[0]) : null;
};

// ================== DELETE ==================
const deleteLead = async (id) => {
  const result = await pool.query(
    "DELETE FROM leads WHERE id=$1 RETURNING *",
    [id]
  );

  return result.rows[0] || null;
};

// ================== EXPORT ==================
module.exports = {
  getAllLeads,
  getById,
  createLead,
  updateLead,
  updateStatus,
  deleteLead,
};