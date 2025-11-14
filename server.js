require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Crear servidor
const app = express();
const PORT = process.env.PORT || 4000;
const MONGODB_URL = process.env.MONGODB_URL;

// --------------------- MIDDLEWARE ---------------------
app.use(cors({
  origin: [
    'http://localhost:5173',              // Frontend en local (Vite)
    'https://benavides2013.github.io'     // Frontend en GitHub Pages
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// --------------------- CONEXIÓN A MONGODB ---------------------
mongoose.connect(MONGODB_URL)
  .then(() => console.log('✅ Conectado correctamente a MongoDB Atlas'))
  .catch(err => console.error('❌ Error conectando a MongoDB:', err.message));

// --------------------- IMPORTAR RUTAS ---------------------
const juegoRoutes = require('./routes/juegoRoutes');
const resenaRoutes = require('./routes/resenaRoutes');

// Aquí montamos los endpoints REALES 👇
app.use('/api/juegos', juegoRoutes);
app.use('/api/resenas', resenaRoutes);

// --------------------- RUTA BASE ---------------------
app.get('/', (req, res) => {
  res.send('🌙 Bienvenido a la API de MoonState');
});

// --------------------- INICIAR SERVIDOR ---------------------
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en puerto ${PORT}`);
});
