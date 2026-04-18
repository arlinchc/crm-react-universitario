const pool = require("../db/connection");

const getAllStatuses = async () => {
  const result = await pool.query(
    "SELECT * FROM lead_statuses ORDER BY id ASC"
  );
  return result.rows;
};

const createStatus = async ({ name, active = true }) => {
  const result = await pool.query(
    `
    INSERT INTO lead_statuses (name, active)
    VALUES ($1, $2)
    RETURNING *
    `,
    [name, active]
  );

  return result.rows[0];
};

const updateStatus = async (id, { name, active }) => {
  const result = await pool.query(
    `
    UPDATE lead_statuses
    SET name = $1,
        active = $2,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = $3
    RETURNING *
    `,
    [name, active, id]
  );

  return result.rows[0];
};

module.exports = {
  getAllStatuses,
  createStatus,
  updateStatus,
};