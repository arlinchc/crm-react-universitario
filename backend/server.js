// Servidor Express - CRM Universitario

require("dotenv").config();
const express = require("express");
const cors = require("cors");

// Rutas
const leadsRoutes = require("./routes/leadsRoutes");

// Crear app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/leads", leadsRoutes);

// Ruta base (opcional pero útil)
app.get("/", (req, res) => {
  res.send("CRM University API funcionando 🚀");
});

// Puerto
const PORT = process.env.PORT || 3000;

// Servidor
app.listen(PORT, () => {
  console.log(`CRM API running on port ${PORT}`);
});