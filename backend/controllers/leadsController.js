<<<<<<< HEAD
//Conectar las rutas con la lógica de la aplicacion  leadsController.js
const leadsModel = require("../models/leadsModel");

const getLeads = async (req, res) => {
  try {
    const leads = await leadsModel.getAllLeads();
    res.json(leads);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving leads" });
  }
};

const createLead = async (req, res) => {
  try {
    const newLead = await leadsModel.createLead(req.body);
    res.json(newLead);
  } catch (error) {
    res.status(500).json({ error: "Error creating lead" });
  }
};

module.exports = {
  getLeads,
  createLead,
=======
const model = require("../models/leadsModel");

// Este controller contiene la API para:
// 1) leer todos los leads,
// 2) leer un lead por id,
// 3) cambiar el status de un lead y guardar el cambio en la base de datos.

exports.getLeads = async (req, res) => {
  res.json(await model.getAll());
};

exports.getLead = async (req, res) => {
  const lead = await model.getById(req.params.id);
  if (!lead) return res.status(404).json({ error: "Not found" });
  res.json(lead);
};

exports.updateStatus = async (req, res) => {
  const updated = await model.updateStatus(req.params.id, req.body.status);
  if (!updated) return res.status(404).json({ error: "Not found" });
  res.json(updated);
>>>>>>> feature-Ulises
};
