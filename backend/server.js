require("dotenv").config();
const express = require("express");
const cors = require("cors");

const leadsRoutes = require("./routes/leadsRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Punto de entrada de la API del módulo Leads.
app.use("/api/leads", leadsRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`CRM API running on port ${PORT}`);
});
