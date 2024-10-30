// server.js
require('dotenv').config(); // Cargar variables de entorno
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

// Middlewares
app.use(express.json()); // Parsear JSON en las solicitudes
app.use(morgan('dev')); // Registrar solicitudes HTTP en desarrollo
app.use(cors()); // Habilitar CORS

// Variables de entorno
const PORT = process.env.PORT || 3000;

// Rutas (aquí añadiremos las rutas más adelante)
app.get('/', (req, res) => {
  res.send('¡Bienvenido al servidor de sistema de exámenes!');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
