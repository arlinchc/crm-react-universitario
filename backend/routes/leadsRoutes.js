const express = require("express");
const router = express.Router();

const leadsController = require("../controllers/leadsController");

router.get("/", leadsController.getLeads);
router.post("/", leadsController.createLead);

module.exports = router;