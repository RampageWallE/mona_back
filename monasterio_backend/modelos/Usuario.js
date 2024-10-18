const mongoose = require('mongoose');

// Definir el esquema de Usuario
const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    numeroTelefonico: {
        type: String,
        required: true
    },
    dni: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true,
        unique: true
    },
    contraseña: {
        type: String,
        required: true
    },
    permisos: {
        type: [String], // Array de permisos
        default: []     // Inicialmente vacío
    }
}, { timestamps: true }); // timestamps agregará automáticamente campos 'createdAt' y 'updatedAt'

// Crear el modelo de Usuario basado en el esquema
const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
