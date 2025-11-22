const express = require('express');
const router = express.Router();
const juegoController = require('../controllers/juegoController');

// Rutas CRUD para Juegos (Endpoints: /api/juegos)
router.post('/', juegoController.crearJuego);
router.get('/', juegoController.obtenerJuegos);
router.get('/:id', juegoController.obtenerJuegoPorId);
router.put('/:id', juegoController.actualizarJuego);
router.delete('/:id', juegoController.eliminarJuego);

module.exports = router; 

// GET UN JUEGO POR ID
router.get('/:id', async (req, res) => {
  try {
    const juego = await Juego.findById(req.params.id);
    if (!juego) return res.status(404).json({ error: 'Juego no encontrado' });
    res.json(juego);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ========== POST - Crear nuevo juego ==========
router.post('/', async (req, res) => {
  try {
    const nuevoJuego = new Juego(req.body);
    await nuevoJuego.save();
    res.status(201).json(nuevoJuego);
  } catch (err) {
    console.error('Error al crear juego:', err);
    res.status(500).json({ error: 'Error al crear juego' });
  }
});

// EDITAR UN JUEGO
router.put('/:id', async (req, res) => {
  try {
    const juego = await Juego.findByIdAndUpdate(
      req.params.id,
      {
        nombre: req.body.nombre,
        genero: req.body.genero,
        desarrollador: req.body.desarrollador,
        año: req.body.año,
        plataforma: req.body.plataforma,
        portada: req.body.portada,
        descripcion: req.body.descripcion,
        completado: req.body.completado,
        horasJugadas: req.body.horasJugadas
      },
      { new: true, runValidators: true }
    );
    res.json(juego);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
// ELIMINAR UN JUEGO
router.delete('/:id', async (req, res) => {
  try {
    const juego = await Juego.findByIdAndDelete(req.params.id);
    if (!juego) return res.status(404).json({ error: 'Juego no encontrado' });
    res.json({ mensaje: 'Juego eliminado', juego });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});