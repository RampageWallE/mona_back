var conexion = require('./conexion');
const Usuario = require('./modelos/Usuario')


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
        const nuevoUsuario = new Usuario({
            nombre : req.body.nombre,
            apellido : req.body.apellido,
            numeroTelefonico : req.body.numeroTelefonico,
            dni : req.body.dni,
            correo : req.body.correo,
            contraseña : req.body.contraseña,
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

module.exports = {
    listUsers,
    postUser
}