require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Crear app
const app = express();
const PORT = process.env.PORT || 4000;
const MONGODB_URL = process.env.MONGODB_URL;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173', // Vite local
    'https://benavides2013.github.io' // GitHub Pages
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(MONGODB_URL)
  .then(() => console.log('✅ Conexión exitosa a MongoDB Atlas'))
  .catch(err => console.error('❌ Error de conexión:', err.message));

// Importar rutas
const juegoRoutes = require('./routes/juegoRoutes');
app.use('/api/juegos', juegoRoutes); // ✅ Conecta las rutas CRUD

// Ruta base de prueba
app.get('/', (req, res) => {
  res.send('🌙 Bienvenido a la API de MoonState');
});

// Levantar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
