require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;
const MONGODB_URL = process.env.MONGODB_URL;

// ← AGREGAR ESTO PRIMERO
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ← LUEGO CORS
app.use(cors());

// ← LUEGO TODO LO DEMÁS
mongoose.connect(MONGODB_URL)
  .then(() => console.log('✅ Conectado correctamente a MongoDB Atlas'))
  .catch(err => console.error('❌ Error conectando a MongoDB:', err.message));

const juegoRoutes = require('./routes/juegoRoutes');
const resenaRoutes = require('./routes/resenaRoutes');

app.use('/api/juegos', juegoRoutes);
app.use('/api/resenas', resenaRoutes);

app.get('/', (req, res) => {
  res.send('🌙 Bienvenido a la API de MoonState');
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en puerto ${PORT}`);
});