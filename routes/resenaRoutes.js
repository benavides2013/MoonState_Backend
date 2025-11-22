const express = require('express');
const router = express.Router();
const resenaController = require('../controllers/resenaController');

// Crear reseña
router.post('/', resenaController.crearResena);

// Obtener TODAS las reseñas
router.get('/', resenaController.obtenerResenas);

// Obtener reseñas por ID de juego   ← NECESARIO PARA EL FRONTEND
router.get('/juego/:juegoId', resenaController.obtenerResenasPorJuego);

// Obtener UNA reseña por su ID 
router.get('/:id', resenaController.obtenerResenas);

// Actualizar reseña
router.put('/:id', resenaController.actualizarResena);

// Eliminar reseña
router.delete('/:id', resenaController.eliminarResena);

module.exports = router;

// EDITAR UNA RESEÑA
router.put('/:id', async (req, res) => {
  try {
    const resena = await Resena.findByIdAndUpdate(
      req.params.id,
      {
        texto: req.body.texto,
        puntuacion: req.body.puntuacion,
        editada: true,
        horaEdicion: new Date()
      },
      { new: true }
    );
    res.json(resena);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ELIMINAR UNA RESEÑA
router.delete('/:id', async (req, res) => {
  try {
    const resena = await Resena.findByIdAndDelete(req.params.id);
    if (!resena) return res.status(404).json({ error: 'Reseña no encontrada' });
    res.json({ mensaje: 'Reseña eliminada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});