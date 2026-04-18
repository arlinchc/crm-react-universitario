// Servidor Express - CRM Universitario

require("dotenv").config();
const express = require("express");
const cors = require("cors");

// Crear app
const app = express();

// ================== MIDDLEWARES ==================
app.use(cors());
app.use(express.json());

// ================== ROUTES ==================

// Leads
const leadsRoutes = require("./routes/leadsRoutes");
app.use("/api/leads", leadsRoutes);

// Configuración
const configurationRoutes = require("./routes/configurationRoutes");
app.use("/api/configuration", configurationRoutes);

// Estados de Lead
const leadStatusRoutes = require("./routes/leadStatusRoutes");
app.use("/api/lead-statuses", leadStatusRoutes);

// ================== ROOT ==================
app.get("/", (req, res) => {
  res.send("CRM University API funcionando 🚀");
});

// ================== SERVER ==================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`CRM API running on port ${PORT}`);
});
const movementsRoutes = require("./routes/movementsRoutes");

app.use("/api/movements", movementsRoutes);
