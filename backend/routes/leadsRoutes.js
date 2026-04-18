const express = require("express");
const router = express.Router();

const leadsController = require("../controllers/leadsController");

// ================== ROUTES ==================
router.get("/", leadsController.getLeads);
router.get("/:id", leadsController.getLeadById);
router.post("/", leadsController.createLead);

// 🔥 AGREGAR ESTAS
router.put("/:id", leadsController.updateLead);
router.patch("/:id", leadsController.updateStatus);
router.delete("/:id", leadsController.deleteLead);

module.exports = router;