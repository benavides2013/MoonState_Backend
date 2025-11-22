const express = require('express');
const router = express.Router();
const Juego = require('../models/Juego');

// ========== FUNCIONES DE VALIDACIÓN ==========

const validarJuego = (juego) => {
  const errores = [];

  // Validar nombre
  if (!juego.nombre || typeof juego.nombre !== 'string') {
    errores.push('El nombre es requerido y debe ser texto');
  }
  if (juego.nombre && juego.nombre.trim().length < 3) {
    errores.push('El nombre debe tener al menos 3 caracteres');
  }
  if (juego.nombre && juego.nombre.length > 100) {
    errores.push('El nombre no puede exceder 100 caracteres');
  }

  // Validar género
  const generosValidos = ['Acción', 'RPG', 'Estrategia', 'Deportes', 'Puzzle', 'Aventura', 'Shooter'];
  if (!juego.genero || !generosValidos.includes(juego.genero)) {
    errores.push(`Género inválido. Debe ser uno de: ${generosValidos.join(', ')}`);
  }

  // Validar año
  const añoActual = new Date().getFullYear();
  if (juego.año && (juego.año < 1950 || juego.año > añoActual + 1)) {
    errores.push(`El año debe estar entre 1950 y ${añoActual + 1}`);
  }

  // Validar plataforma
  const plataformasValidas = ['PC', 'PS5', 'Xbox', 'Nintendo', 'Mobile'];
  if (juego.plataforma && !plataformasValidas.includes(juego.plataforma)) {
    errores.push(`Plataforma inválida. Debe ser una de: ${plataformasValidas.join(', ')}`);
  }

  // Validar horas jugadas
  if (juego.horasJugadas !== undefined) {
    if (typeof juego.horasJugadas !== 'number' || juego.horasJugadas < 0) {
      errores.push('Las horas jugadas debe ser un número positivo');
    }
    if (juego.horasJugadas > 10000) {
      errores.push('Las horas jugadas no pueden exceder 10000');
    }
  }

  // Validar URL de portada
  if (juego.portadaURL) {
    const urlRegex = /^(https?:\/\/).+/;
    if (!urlRegex.test(juego.portadaURL)) {
      errores.push('La URL de portada debe ser válida (http o https)');
    }
  }

  // Validar descripción
  if (juego.descripcion && juego.descripcion.length > 500) {
    errores.push('La descripción no puede exceder 500 caracteres');
  }

  return errores;
};

// ========== GET - Obtener todos los juegos ==========
router.get('/', async (req, res) => {
  try {
    const juegos = await Juego.find();
    
    if (!juegos || juegos.length === 0) {
      return res.status(200).json({ 
        mensaje: 'No hay juegos registrados aún',
        juegos: [] 
      });
    }

    res.json(juegos);
  } catch (err) {
    console.error('Error al obtener juegos:', err);
    res.status(500).json({ 
      error: 'Error al obtener juegos',
      detalles: err.message 
    });
  }
});

// ========== GET - Obtener un juego por ID ==========
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Validar que el ID tenga formato MongoDB
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const juego = await Juego.findById(id);
    
    if (!juego) {
      return res.status(404).json({ 
        error: 'Juego no encontrado',
        id: id 
      });
    }

    res.json(juego);
  } catch (err) {
    console.error('Error al obtener juego:', err);
    res.status(500).json({ 
      error: 'Error al obtener juego',
      detalles: err.message 
    });
  }
});

// ========== POST - Crear nuevo juego ==========
router.post('/', async (req, res) => {
  try {
    // Validar datos
    const errores = validarJuego(req.body);
    
    if (errores.length > 0) {
      return res.status(400).json({ 
        error: 'Datos inválidos',
        detalles: errores 
      });
    }

    // Verificar que no existe un juego con el mismo nombre
    const juegoExistente = await Juego.findOne({ 
      nombre: { $regex: `^${req.body.nombre}$`, $options: 'i' } 
    });

    if (juegoExistente) {
      return res.status(409).json({ 
        error: 'Ya existe un juego con ese nombre' 
      });
    }

    const nuevoJuego = new Juego({
      nombre: req.body.nombre.trim(),
      genero: req.body.genero,
      desarrollador: req.body.desarrollador || 'Desconocido',
      año: req.body.año || new Date().getFullYear(),
      plataforma: req.body.plataforma || 'PC',
      portadaURL: req.body.portadaURL || '',
      descripcion: req.body.descripcion || '',
      completado: req.body.completado || false,
      horasJugadas: req.body.horasJugadas || 0,
      fechaCreacion: new Date()
    });

    await nuevoJuego.save();
    
    res.status(201).json({ 
      mensaje: 'Juego creado exitosamente',
      juego: nuevoJuego 
    });
  } catch (err) {
    console.error('Error al crear juego:', err);
    res.status(500).json({ 
      error: 'Error al crear juego',
      detalles: err.message 
    });
  }
});

// ========== PUT - Actualizar juego ==========
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Validar ID
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    // Validar datos
    const errores = validarJuego(req.body);
    if (errores.length > 0) {
      return res.status(400).json({ 
        error: 'Datos inválidos',
        detalles: errores 
      });
    }

    // Verificar que existe el juego
    const juegoExistente = await Juego.findById(id);
    if (!juegoExistente) {
      return res.status(404).json({ 
        error: 'Juego no encontrado' 
      });
    }

    const juegoActualizado = await Juego.findByIdAndUpdate(
      id,
      {
        ...req.body,
        nombre: req.body.nombre.trim(),
        fechaActualizacion: new Date()
      },
      { new: true, runValidators: true }
    );

    res.json({ 
      mensaje: 'Juego actualizado exitosamente',
      juego: juegoActualizado 
    });
  } catch (err) {
    console.error('Error al actualizar juego:', err);
    res.status(500).json({ 
      error: 'Error al actualizar juego',
      detalles: err.message 
    });
  }
});

// ========== DELETE - Eliminar juego ==========
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Validar ID
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const juego = await Juego.findByIdAndDelete(id);
    
    if (!juego) {
      return res.status(404).json({ 
        error: 'Juego no encontrado' 
      });
    }

    res.json({ 
      mensaje: 'Juego eliminado correctamente',
      juego: juego 
    });
  } catch (err) {
    console.error('Error al eliminar juego:', err);
    res.status(500).json({ 
      error: 'Error al eliminar juego',
      detalles: err.message 
    });
  }
});

module.exports = router;