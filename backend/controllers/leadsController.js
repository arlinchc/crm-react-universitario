const leadsModel = require("../models/leadsModel");

const getLeads = async (req, res) => {

    try {

        const leads = await leadsModel.getAllLeads();
        res.json(leads);

    } catch (error) {
            console.error("Error en getLeads:", error); // ← agrega esta línea


        res.status(500).json({ error: "Error retrieving leads" });

    }
};

const createLead = async (req, res) => {

    try {

        const newLead = await leadsModel.createLead(req.body);
        res.json(newLead);

    } catch (error) {

        res.status(500).json({ error: "Error creating lead" });

    }
};

module.exports = {
    getLeads,
    createLead
};