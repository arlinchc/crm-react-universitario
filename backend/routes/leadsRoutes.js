<<<<<<< HEAD
<<<<<<< HEAD
//Maneja las solicitudes HTTP para leads, utilizando la lógica definida
//  en leadsModel.js
=======
//Maneja las solicitudes HTTP para leads, utilizando la logica definida
// en leadsModel.js
>>>>>>> feature-axel
const express = require("express");
const router = express.Router();

const leadsController = require("../controllers/leadsController");

router.get("/", leadsController.getLeads);
router.post("/", leadsController.createLead);
<<<<<<< HEAD
=======
const router = require("express").Router();
const ctrl = require("../controllers/leadsController");

// APIs principales del módulo Leads.
// GET /api/leads            -> lista todos los leads
// GET /api/leads/:id        -> obtiene el detalle de un lead
// PATCH /api/leads/:id/status -> cambia el status y lo guarda en PostgreSQL

router.get("/", ctrl.getLeads);
router.get("/:id", ctrl.getLead);
router.patch("/:id/status", ctrl.updateStatus);
>>>>>>> feature-Ulises

module.exports = router;
=======

module.exports = router;

>>>>>>> feature-axel
