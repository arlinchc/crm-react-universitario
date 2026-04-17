const pool = require("../db/connection");

const getAllLeads = async () => {
  const result = await pool.query("SELECT * FROM leads ORDER BY id DESC");
  return result.rows;
};

const createLead = async (lead) => {
  const { full_name, program_interest, phone, email, status, advisor } = lead;
  const result = await pool.query(
    `INSERT INTO leads (full_name, program_interest, phone, email, status, advisor)
     VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
    [full_name, program_interest, phone, email, status, advisor]
  );
  return result.rows[0];
};

const updateLead = async (id, lead) => {
  const { full_name, program_interest, phone, email, status, advisor } = lead;
  const result = await pool.query(
    `UPDATE leads SET full_name=$1, program_interest=$2, phone=$3,
     email=$4, status=$5, advisor=$6 WHERE id=$7 RETURNING *`,
    [full_name, program_interest, phone, email, status, advisor, id]
  );
  return result.rows[0];
};

const deleteLead = async (id) => {
  await pool.query("DELETE FROM leads WHERE id=$1", [id]);
};

module.exports = { getAllLeads, createLead, updateLead, deleteLead };