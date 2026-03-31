// Conectar las rutas con la lógica de la aplicación  leadsControllers.js
const leadsModel = require("../models/leadsModel");

const getLeads = async (req, res) => {
  try {
    const leads = await leadsModel.getAllLeads();
    res.json(leads);
  } catch (error) {
    console.error("ERROR REAL LEADS", error); // 
    res.status(500).json({ error: "Error retrieving leads" });
  }
};

const createLead = async (req, res) => {
  try {
    const newLead = await leadsModel.createLead(req.body);
    res.json(newLead);
  } catch (error) {
    console.error("ERROR REAL CREATE LEAD", error); // 
    res.status(500).json({ error: "Error creating lead" });
  }
};

module.exports = {
  getLeads,
  createLead
};