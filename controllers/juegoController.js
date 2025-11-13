// IMPORTAR Para decir que se devuelva e ingrese a models juego//
const Juego = require('../models/Juego');

//Casos Exito
//201 = Cuando se creo correctamente
//200 = El resultado solicitado fue exitoso GET/PUT/DELETE

//Casos Error
//400 = Datos son invalidos (CLIENTE O USUARIO)
//404 = Recurso inexistente
//500 = Error del servidor propio



//CRUD
// C  Crear JUEGO - CREATE

exports.crearJuego = async (req, res) => { //Reciba petición de respuesta//
    try{
        const nuevoJuego = new Juego(req.body); //Crear nuevo juego con datos enviados//
        await nuevoJuego.save(); //Guardar en la base de datos//
        res.status(201).json(nuevoJuego);
    }catch (error) {
        res.status(400).json({
            error: 'Error al agregar juego. Verifique campos',
            details: error.message
        });
    }
};


//R Obtener DATOS - READ

exports.obtenerJuegos = async (req, res) => {
    try {
        const juegos = await Juego.find();
        res.status(200).json(juegos);
    } catch (error) {  
        res.status(500).json({ error: 'Error interno del servidor al obtener juegos'})
    }
};

//R Obtener datos por ID JUEGO

exports.obtenerJuegoPorId = async (req, res) => {
    try{
        const juego = await Juego.findById(req.params.id)
        if (!juego){
            return res.status(404).json({ msg: 'Juego No encontrado'});
        }
        res.status(200).json(juego);
    } catch (error) {
        res.status(500).json({ error: 'Error al buscar juego'})
    }
};    

// U Actualizar - UPDATE

exports.actualizarJuego = async (req, res) => {
    try {
        const juego = await Juego.findByIdAndUpdate(
            req.params.id, 
            req.body,
            {new: true, runValidators: true}
        );
        if(!juego) {
            return res.status(404).json ({ msg: 'Juego no encontrado para actualizar' });
            
        }
        res.status(200).json(juego);
    } catch (error) {
        res.status(400).json({
         error: 'Error al actualizar el juego',
         details: error.message
        });
    }    
};

// D Eliminar - DELETE

exports.eliminarJuego = async (req, res) => {
    try{
        const juego = await Juego.findByIdAndDelete(req.params.id)
        if(!juego){
            return res.status(404).json({ msg: 'Juego no encontrado para eliminar' });
        }
        res.status(200).json({ msg: 'Juego eliminado exitosamente'});
    } catch (error) {
        res.status(500).json({error: 'Error al eliminar el juego'});
    }
};
