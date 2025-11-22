const mongoose = require('mongoose');

const juegoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del juego es obligatorio'],
        trim: true,
        unique: true,
    },
    genero: {
        type: String,
        required: [true, 'El genero del juego es obligarorio'],
    },

    plataforma: {
        type: String,
        required: [true, 'La plataforma es obligatoria'],
    },
    portadaURL: {
        type: String,
        required: false,
    },
    estado: {
        type: String,
        enum: ['Pendiente', 'Jugando', 'Completado', 'Entrenamiento', 'Competitivo'], // opciones válidas
        default: 'Pendiente', // valor por defecto
    },
    horasJugadas: {
        type: Number,
        default: 0,
        min: 0,
    }
}, {
    timestamps: true // agrega automáticamente createdAt y updatedAt
});

module.exports = mongoose.model('Juego', juegoSchema);
