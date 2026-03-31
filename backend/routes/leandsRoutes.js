const express = require("express");
const router = express.Router();
const leadsController = require("../controllers/leandsControllers");

router.get("/",          leadsController.getLeads);
router.post("/",         leadsController.createLead);
router.put("/:id",       leadsController.updateLead);
router.delete("/:id",    leadsController.deleteLead);

module.exports = router;