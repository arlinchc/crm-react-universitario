const pool = require("../db/connection");

const getAllLeads = async () => {
  const result = await pool.query(
    "SELECT * FROM leads ORDER BY id DESC"
  );
  return result.rows;
};

const createLead = async (lead) => {

  const { full_name, program_interest, phone, email, status, advisor } = lead;

  const result = await pool.query(
    `INSERT INTO leads
      (full_name, program_interest, phone, email, status, advisor)
       VALUES ($1,$2,$3,$4,$5,$6)
      RETURNING *`,
    [full_name, program_interest, phone, email, status, advisor]
  );

  return result.rows[0];
};

module.exports = {
  getAllLeads,
  createLead
};