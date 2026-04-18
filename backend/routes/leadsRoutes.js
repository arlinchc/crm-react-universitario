// Maneja las solicitudes  HTTPpara leads usando la logica definida en leadModel.js
const express = require("express");
const router = express.Router();

const leadsController = require("../controllers/leadsControllers");

router.get("/", leadsController.getLeads);
router.post("/", leadsController.createLead);

module.exports = router;
