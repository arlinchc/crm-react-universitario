const pool = require("../db/connection");

const getConfiguration = async () => {
  const result = await pool.query(
    "SELECT * FROM configuration ORDER BY id ASC LIMIT 1"
  );
  return result.rows[0];
};

const saveConfiguration = async ({ institution_name, address, phone }) => {
  const existing = await pool.query(
    "SELECT id FROM configuration ORDER BY id ASC LIMIT 1"
  );

  if (existing.rows.length > 0) {
    const id = existing.rows[0].id;

    const result = await pool.query(
      `
      UPDATE configuration
      SET institution_name = $1,
          address = $2,
          phone = $3,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $4
      RETURNING *
      `,
      [institution_name, address, phone, id]
    );

    return result.rows[0];
  }

  const result = await pool.query(
    `
    INSERT INTO configuration (institution_name, address, phone)
    VALUES ($1, $2, $3)
    RETURNING *
    `,
    [institution_name, address, phone]
  );

  return result.rows[0];
};

module.exports = {
  getConfiguration,
  saveConfiguration,
};