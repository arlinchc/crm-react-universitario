// Servidor Express - CRM Universitario

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

// Crear app
const app = express();

// ================== MIDDLEWARES ==================
app.use(cors({
  origin: "*", // en producción puedes restringir a Netlify
}));
app.use(express.json());

// Carpeta pública (uploads)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ================== ROUTES ==================
const leadsRoutes = require("./routes/leadsRoutes");
const configurationRoutes = require("./routes/configurationRoutes");
const leadStatusRoutes = require("./routes/leadStatusRoutes");
const movementsRoutes = require("./routes/movementsRoutes");
const advisorsRoutes = require("./routes/advisorsRoutes");

// APIs
app.use("/api/leads", leadsRoutes);
app.use("/api/configuration", configurationRoutes);
app.use("/api/lead-statuses", leadStatusRoutes);
app.use("/api/movements", movementsRoutes);
app.use("/api/advisors", advisorsRoutes);

// ================== ROOT ==================
app.get("/", (req, res) => {
  res.send("CRM University API funcionando 🚀");
});

// ================== 404 HANDLER ==================
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// ================== ERROR HANDLER ==================
app.use((err, req, res, next) => {
  console.error("ERROR GLOBAL:", err);
  res.status(500).json({ error: "Error interno del servidor" });
});

// ================== SERVER ==================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});