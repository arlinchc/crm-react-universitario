const advisorsModel = require("../models/advisorsModel");

const getAdvisors = async (req, res) => {
  try {
    const advisors = await advisorsModel.getAllAdvisors();
    res.json(advisors);
  } catch (error) {
    console.error("ERROR GET ADVISORS:", error);
    res.status(500).json({ error: "Error retrieving advisors" });
  }
};

const createAdvisor = async (req, res) => {
  try {
    const newAdvisor = await advisorsModel.createAdvisor(req.body);
    res.json(newAdvisor);
  } catch (error) {
    console.error("ERROR CREATE ADVISOR:", error);
    res.status(500).json({ error: "Error creating advisor" });
  }
};

module.exports = {
  getAdvisors,
  createAdvisor,
};