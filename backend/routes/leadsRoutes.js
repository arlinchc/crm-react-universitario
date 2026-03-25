const router = require("express").Router();
const ctrl = require("../controllers/leadsController");

// APIs principales del módulo Leads.
// GET /api/leads            -> lista todos los leads
// GET /api/leads/:id        -> obtiene el detalle de un lead
// PATCH /api/leads/:id/status -> cambia el status y lo guarda en PostgreSQL

router.get("/", ctrl.getLeads);
router.get("/:id", ctrl.getLead);
router.patch("/:id/status", ctrl.updateStatus);

module.exports = router;
