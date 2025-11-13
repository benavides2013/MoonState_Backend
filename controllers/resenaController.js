const Resena = require('../models/Resena');

//C
exports.crearResena = async (req, res) => { //Reciba petición de respuesta//
    try{
        const nuevaResena = new Resena(req.body); 
        await nuevaResena.save(); //Guardar en la base de datos//
        res.status(201).json(nuevaResena);
    } catch (error) {
        res.status(400).json({ 
            error: 'Error al crear la resena', 
            details: error.message
        });
    }
};

//R Obtener datos con opción de filtrar
exports.obtenerResenas = async (req, res) => {
    try {
        //Permite filtrar reseñas por el ID del juego enviado en la query
        const filtro = req.query.juegoId ? { juego: req.query.juegoId } : {};

        // .populate('juego', 'nombre') trae el nombre del juego relacionado
        const resenas = await Resena.find(filtro).populate('juego', 'nombre');

        res.status(200).json(resenas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las reseñas' });
    }
};

//R
exports.obtenerResenaPorId = async (req, res) => {
    try{
        const resena = await Resena.findById(req.params.id).populate('juego', 'nombre');

        if (!resena){
            return res.status(404).json({ msg: 'Reseña no encontrada' });
        }

        res.status(200).json(resena);
    } catch (error) {
        res.status(500).json({ error: 'Error al buscar la reseña' });
    }
}


//U

exports.actualizarResena = async (req, res) => {
    try{
        const resena = await Resena.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            {new: true, runValidators: true}
        ); 

        if (!resena){
            return res.status(404).json({ msg: 'Reseña no encontrada para actualizar' });
        }

        res.status(200).json(resena);
    } catch (error) {
        res.status(400).json({
            error: 'Error al actualizar la reseña',
            details: error.message
        });
    }    
};


// D Eliminar

exports.eliminarResena = async (req, res) => {
    try{
        const resena = await Resena.findByIdAndDelete(req.params.id);

        if(!resena) {
            return res.status(404).json({ msg: 'Resena no encontrada para eliminar' })
        }

        res.status(200).json({ msg: 'Reseña eliminado exitosamente'});
    } catch (error) {
        res.status(500).json({error: 'Error al eliminar la reseña'});
    }
};
