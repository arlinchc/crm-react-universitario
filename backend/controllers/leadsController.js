// Conectar las rutas con la lógica de la aplicación
const leadsModel = require("../models/leadsModel");

// ================== GET ALL ==================
const getLeads = async (req, res) => {
  try {
    const leads = await leadsModel.getAllLeads();
    res.json(leads);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving leads" });
  }
};

// ================== GET BY ID ==================
const getLead = async (req, res) => {
  try {
    const lead = await leadsModel.getById(req.params.id);

    if (!lead) {
      return res.status(404).json({ error: "Lead not found" });
    }

    res.json(lead);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving lead" });
  }
};

// ================== CREATE ==================
const createLead = async (req, res) => {
  try {
    const newLead = await leadsModel.createLead(req.body);
    res.status(201).json(newLead);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating lead" });
  }
};

// ================== UPDATE STATUS ==================
const updateStatus = async (req, res) => {
  try {
    const updated = await leadsModel.updateStatus(
      req.params.id,
      req.body.status
    );

    if (!updated) {
      return res.status(404).json({ error: "Lead not found" });
    }

    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating status" });
  }
};

// ================== EXPORT ==================
module.exports = {
  getLeads,
  getLead,
  createLead,
  updateStatus,
};