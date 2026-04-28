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
  console.log("🔥 USANDO NUEVO KPI QUERY");
  const result = await pool.query(
    `SELECT 
      COUNT(*) AS prospectos,

      COUNT(*) FILTER (
        WHERE LOWER(status) = 'enrolled'
      ) AS inscritos

    FROM (
      SELECT DISTINCT ON (id_lead)
        id_lead,
        status
      FROM advisor_lead_movements
      WHERE id_advisor = $1
      ORDER BY id_lead, created_at DESC
    ) AS ultimos`,
    [advisorId]
  );

  return result.rows[0];
};


const createMovement = async (
  id_advisor,
  id_lead,
  status,
  lead_name,
  lead_phone,
  program_interest
) => {
  const result = await pool.query(
    `INSERT INTO advisor_lead_movements
     (id_advisor, id_lead, status, lead_name, lead_phone, program_interest)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [id_advisor, id_lead, status, lead_name, lead_phone, program_interest]
  );

  return result.rows[0];
};

module.exports = {
  getMovementsByAdvisor,
  getKPIByAdvisor
};