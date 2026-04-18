const leadStatusModel = require("../models/leadStatusModel");

const getStatuses = async (req, res) => {
  try {
    const statuses = await leadStatusModel.getAllStatuses();
    res.json(statuses);
  } catch (error) {
    console.error("Error retrieving lead statuses:", error);
    res.status(500).json({ error: "Error retrieving lead statuses" });
  }
};

const createStatus = async (req, res) => {
  try {
    const { name, active } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    const newStatus = await leadStatusModel.createStatus({
      name,
      active: active ?? true,
    });

    res.status(201).json(newStatus);
  } catch (error) {
    console.error("Error creating lead status:", error);
    res.status(500).json({ error: "Error creating lead status" });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, active } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    const updatedStatus = await leadStatusModel.updateStatus(id, {
      name,
      active,
    });

    if (!updatedStatus) {
      return res.status(404).json({ error: "Status not found" });
    }

    res.json(updatedStatus);
  } catch (error) {
    console.error("Error updating lead status:", error);
    res.status(500).json({ error: "Error updating lead status" });
  }
};

module.exports = {
  getStatuses,
  createStatus,
  updateStatus,
};