// server.js
const express = require('express');
const { connectDB } = require('./config/database');
const usuarioRoutes = require('./routes/usuarioRoutes');
const auditoriaRoutes = require('./routes/auditoriaRoutes');
const materiaRoutes = require('./routes/materia-routes');
const  clasesRoutes  = require('./routes/clase-routes');
const examenRoutes = require('./routes/examen-routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Conectar a la base de datos
connectDB();

// Middlewares
app.use(express.json());

// Rutas
app.use('/api', usuarioRoutes);
app.use('/api', auditoriaRoutes);
app.use('/api', auditoriaRoutes);
app.use('/api', materiaRoutes);
app.use('/api',clasesRoutes);
app.use('/api',examenRoutes);

app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
