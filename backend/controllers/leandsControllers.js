<<<<<<< HEAD
const leadsModel = require("../models/leandsModels");

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

const updateLead = async (req, res) => {
  try {
    const updated = await leadsModel.updateLead(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: "Lead no encontrado" });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Error updating lead" });
  }
};

const deleteLead = async (req, res) => {
  try {
    await leadsModel.deleteLead(req.params.id);
    res.json({ message: "Lead eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting lead" });
  }
};

module.exports = { getLeads, createLead, updateLead, deleteLead };
=======
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
  createLead
};
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
const express = require("express");
const router = express.Router();

const leadsController = require("../controllers/leadsController");

router.get("/", leadsController.getLeads);
router.post("/", leadsController.createLead);

module.exports = router;

const express = require("express");
const cors = require("cors");

const leadsRoutes = require("./routes/leadsRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/leads", leadsRoutes);

app.listen(3000, () => {
  console.log("CRM University API running on port 3000");
});
>>>>>>> feature-carlos
