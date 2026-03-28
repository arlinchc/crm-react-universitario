const movementsModel = require("../models/movementsModel");

// Obtener tabla (para AsesorTable)
const getMovements = async (req, res) => {
  try {
    const { advisorId } = req.query;

    const data = await movementsModel.getMovementsByAdvisor(advisorId);

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving movements" });
  }
};

// KPIs
const getKPI = async (req, res) => {
  try {
    const { advisorId } = req.query;

    const data = await movementsModel.getKPIByAdvisor(advisorId);

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving KPI" });
  }
};

module.exports = {
  getMovements,
  getKPI
};