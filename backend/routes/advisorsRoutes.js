const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
  getAdvisors,
  createAdvisor,
} = require("../controllers/advisorsControllers");

// 1. Configuración de dónde se guardarán las fotos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Asegúrate de que esta carpeta exista en la raíz de tu servidor
  },
  filename: (req, file, cb) => {
    // Esto le da un nombre único al archivo: fecha-nombreoriginal
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// 2. Rutas
router.get("/", getAdvisors);

// 3. ¡IMPORTANTE! Agregamos upload.single("photo") 
// "photo" debe coincidir con el nombre que pusimos en el frontend (formData.append("photo", ...))
router.post("/", upload.single("photo"), createAdvisor);

module.exports = router;