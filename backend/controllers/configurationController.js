const configurationModel = require("../models/configurationModel");

const getConfiguration = async (req, res) => {
  try {
    const configuration = await configurationModel.getConfiguration();
    res.json(configuration);
  } catch (error) {
    console.error("Error retrieving configuration:", error);
    res.status(500).json({ error: "Error retrieving configuration" });
  }
};

const saveConfiguration = async (req, res) => {
  try {
    const { institution_name, address, phone } = req.body;

    if (!institution_name || !address || !phone) {
      return res.status(400).json({
        error: "institution_name, address and phone are required",
      });
    }

    const configuration = await configurationModel.saveConfiguration({
      institution_name,
      address,
      phone,
    });

    res.json(configuration);
  } catch (error) {
    console.error("Error saving configuration:", error);
    res.status(500).json({ error: "Error saving configuration" });
  }
};

module.exports = {
  getConfiguration,
  saveConfiguration,
};