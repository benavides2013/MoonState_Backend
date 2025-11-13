const express = require('express');
const router = express.Router();
const resenaController = require('../controllers/resenaController');

// Rutas CRUD para Reseñas
router.post('/', resenaController.crearResena);
router.get('/', resenaController.obtenerResenas);
router.get('/:id', resenaController.obtenerResenaPorId);
router.put('/:id', resenaController.actualizarResena);
router.delete('/:id', resenaController.eliminarResena);

module.exports = router;