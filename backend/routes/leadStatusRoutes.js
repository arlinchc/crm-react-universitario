const express = require("express");
const router = express.Router();

const leadStatusController = require("../controllers/leadStatusController");

router.get("/", leadStatusController.getStatuses);
router.post("/", leadStatusController.createStatus);
router.put("/:id", leadStatusController.updateStatus);

module.exports = router;