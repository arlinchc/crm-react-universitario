const pool = require("../db/connection");

const getAllAdvisors = async () => {
  const result = await pool.query(
    "SELECT * FROM advisors ORDER BY id DESC"
  );
  return result.rows;
};

const createAdvisor = async (advisor) => {
  const { full_name, email, phone, area } = advisor;

  const result = await pool.query(
    `INSERT INTO advisors (full_name, email, phone, area)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [full_name, email, phone, area]
  );
  
  
  return result.rows[0];
};

module.exports = {
  getAllAdvisors,
  createAdvisor
};