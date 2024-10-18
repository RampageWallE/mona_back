var conexion = require('./conexion');
const bcrypt = require('bcryptjs');
const Usuario = require('./modelos/Usuario');
const jwt = require('jsonwebtoken');


const SECRET_KEY = process.env.JWT_SECRET || "w@M9EZRjekuw)tzt1vGb2J0:HAsfm^*N5X+'f3[KOi.S6@:mmU"

listUsers = async (req, res) => {
    try{
        conexion.conectarDB();
        const usuarios = await Usuario.find();
        // conexion.desconectarDB();
        res.status(200).json(
            {
                "usuarios":usuarios
            }
        )
    }catch(err){
        res.status(500).json(
            {
                error: 'Error al obtener todos los usuarios',
                message: err.message
            }
        )
    }
}

postUser = async (req, res) => {
    try{
        // conexion.desconectarDB();
        conexion.conectarDB();

        const contraseñaHasheada = await bcrypt.hash(req.body.contraseña, 10);
        const nuevoUsuario = new Usuario({
            nombre : req.body.nombre,
            apellido : req.body.apellido,
            numeroTelefonico : req.body.numeroTelefonico,
            dni : req.body.dni,
            correo : req.body.correo,
            contraseña : contraseñaHasheada,
            permisos: req.body.permisos
        })
        await nuevoUsuario.save();
        // conexion.desconectarDB()
        res.status(200).json(
            {
                message: "Usuario registrado exitosamente",
                usuario: nuevoUsuario 
            }
        )
    }catch(err){
        res.status(500).json(
            {
                error:"You have problems dude",
                message:err.message
            }
        )
    }
}

postLogin = async (req, res) => {
    try {
        // Conectar a la base de datos
        conexion.conectarDB();

        // Buscar el usuario por correo
        const usuario = await Usuario.findOne({ correo: req.body.correo });
        if (!usuario) {
            return res.status(400).json({ message: "Correo no registrado" });
        }

        // Comparar la contraseña ingresada con la hasheada
        const contraseñaValida = await bcrypt.compare(req.body.contraseña, usuario.contraseña);
        if (!contraseñaValida) {
            return res.status(400).json({ message: "Contraseña incorrecta" });
        }

        const token = jwt.sign(
            { id: usuario._id, correo: usuario.correo, permisos: usuario.permisos }, 
            SECRET_KEY, // Debes usar una clave secreta más fuerte, idealmente en una variable de entorno
            { expiresIn: '1h' } // Token expira en 1 hora
        );


        // Si la contraseña es válida, iniciar sesión
        res.status(200).json({
            message: "Login exitoso",
            token
        });

    } catch (err) {
        res.status(500).json({
            error: "You have problems dude",
            message: err.message
        });
    }
}

deleteUser = async (req, res) => {
    try{
        conexion.conectarDB();
        const usuarioEliminado = await Usuario.findOneAndDelete({_id : req.body._id});
        
        if (!usuarioEliminado) {
            return res.status(404).json({
                message: "Usuario no encontrado"
            });
        }

        res.status(200).json({
            message: "Usuario eliminado exitosamente",
            usuario: usuarioEliminado
        });
    }catch(err){
        res.status(500).json({
            error: "You have problems dude",
            message: err.message
        });
    }
}



module.exports = {
    listUsers,
    postUser,
    postLogin,
    deleteUser
}