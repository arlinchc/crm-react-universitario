// Conectar las rutas con la lógica de la aplicación
const leadsModel = require("../models/leadsModel");

// ================== GET ALL ==================
const getLeads = async (req, res) => {
  try {
    const leads = await leadsModel.getAllLeads();
    res.json(leads);
  } catch (error) {
    console.error("ERROR GET LEADS:", error);
    res.status(500).json({ error: "Error retrieving leads" });
  }
};

// ================== GET BY ID ==================
const getLeadById = async (req, res) => {
  try {
    const lead = await leadsModel.getById(req.params.id);

    if (!lead) {
      return res.status(404).json({ error: "Lead no encontrado" });
    }

    res.json(lead);
  } catch (error) {
    console.error("ERROR GET BY ID:", error);
    res.status(500).json({ error: "Error retrieving lead" });
  }
};

// ================== CREATE ==================
const createLead = async (req, res) => {
  try {
    const newLead = await leadsModel.createLead(req.body);
    res.status(201).json(newLead);
  } catch (error) {
    console.error("ERROR CREATE LEAD:", error);
    res.status(500).json({ error: "Error creating lead" });
  }
};

// ================== UPDATE COMPLETO ==================
const updateLead = async (req, res) => {
  try {
    const updated = await leadsModel.updateLead(
      req.params.id,
      req.body
    );

    if (!updated) {
      return res.status(404).json({ error: "Lead no encontrado" });
    }

    res.json(updated);
  } catch (error) {
    console.error("ERROR UPDATE LEAD:", error);
    res.status(500).json({ error: "Error updating lead" });
  }
};

// ================== UPDATE STATUS ==================
const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: "Status es requerido" });
    }

    const updated = await leadsModel.updateStatus(
      req.params.id,
      status
    );

    if (!updated) {
      return res.status(404).json({ error: "Lead no encontrado" });
    }

    res.json(updated);
  } catch (error) {
    console.error("ERROR UPDATE STATUS:", error);
    res.status(500).json({ error: "Error updating lead status" });
  }
};

// ================== DELETE ==================
const deleteLead = async (req, res) => {
  try {
    const deleted = await leadsModel.deleteLead(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "Lead no encontrado" });
    }

    res.json({ message: "Lead eliminado correctamente" });
  } catch (error) {
    console.error("ERROR DELETE LEAD:", error);
    res.status(500).json({ error: "Error deleting lead" });
  }
};

// ================== EXPORT ==================
module.exports = {
  getLeads,
  getLeadById,
  createLead,
  updateLead,
  updateStatus,
  deleteLead,
};