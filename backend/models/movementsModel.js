const pool = require("../db/connection");

const getMovementsByAdvisor = async (advisorId) => {
  const result = await pool.query(
    `SELECT * FROM advisor_lead_movements
     WHERE id_advisor = $1
     ORDER BY created_at DESC`,
    [advisorId]
  );

  return result.rows;
};

const getKPIByAdvisor = async (advisorId) => {
  const result = await pool.query(
    `SELECT 
      COUNT(*) AS prospectos,
      COUNT(*) FILTER (WHERE status = 'Inscrito') AS inscritos
     FROM advisor_lead_movements
     WHERE id_advisor = $1`,
    [advisorId]
  );

  return result.rows[0];
};

module.exports = {
  getMovementsByAdvisor,
  getKPIByAdvisor
};