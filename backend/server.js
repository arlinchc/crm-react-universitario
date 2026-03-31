const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());

// hacer pública la carpeta uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// rutas
const advisorsRoutes = require("./routes/advisorsRoutes");
app.use("/api/advisors", advisorsRoutes);

app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});
