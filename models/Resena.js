const mongoose = require('mongoose');
const { Schema } = mongoose;

const ResenaSchema = new mongoose.Schema({
    //Relaciona la reseña con un juego especifico
    juego: {
        type: Schema.Types.ObjectId,
        ref: 'Juego', // Referencia al modelo Juego
        required: true
    },

    puntuacion: { //Para la 'Puntuación con estrellas'
        type: Number,
        required: true,
        min: 1, 
        max: 5
    },

    texto: { //Para 'Escribir reseña detallada´
        type: String,
        required: [true, 'El texto de la reseña es obligatorio']
    },

    autor: {
        type: String, 
        default: 'Usuario GameTracker'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Resena', ResenaSchema);