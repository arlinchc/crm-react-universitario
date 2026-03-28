const express = require("express");
const router = express.Router();

const movementsController = require("../controllers/movementsController");

router.get("/", movementsController.getMovements);
router.get("/kpi", movementsController.getKPI);

module.exports = router;