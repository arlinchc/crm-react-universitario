const express = require("express");
const router = express.Router();

const configurationController = require("../controllers/configurationController");

router.get("/", configurationController.getConfiguration);
router.post("/", configurationController.saveConfiguration);

module.exports = router;