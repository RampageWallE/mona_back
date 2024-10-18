const mongoose = require('mongoose');
require('dotenv').config();

// const dbURI = process.env.MONGO_URI;
const dbURI = process.env.MONGO_URI || 'mongodb://localhost:27017/monasterio_backend';

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

let isConnected; // Variable para comprobar el estado de la conexión

const conectarDB = async () => {
    // Si ya estamos conectados, no hacemos nada
    if (isConnected) {
        console.log('Ya está conectado a la base de datos MongoDB');
        return;
    }

    try {
        await mongoose.connect(dbURI, options);
        isConnected = true;
        console.log('Conectado a la base de datos MongoDB');
    } catch (err) {
        console.error('Error al conectar a la base de datos:', err);
        throw err; // Lanzar error si falla la conexión
    }
};

const desconectarDB = async () => {
    // Si ya estamos desconectados, no hacemos nada
    if (isConnected) {
        await mongoose.disconnect();
        isConnected = false; // Marcar como desconectado
        console.log('Desconectado de la base de datos MongoDB');
    }
};



// Exportar las funciones
module.exports = {
    conectarDB,
    desconectarDB
};
