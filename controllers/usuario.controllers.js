const Usuario = require('../models/usuario.models');


// ************* OBTENER USUARIOS ********************* */
exports.GetUsers = async (req,res) =>{

    const usuariosGet = await Usuario.find();
    res.json(usuariosGet);

}

// ************* ELIMINAR USUARIOS ********************* */

exports.eliminarUsuario = async(req, res) => {

    const { _id } = req.params;
    const userFound = await Usuario.findById(_id);

    if(userFound)
    {
        await Usuario.deleteOne({ _id : req.params });
        res.json('El usuario ha sido Eliminado');

    } else {

        res.status(400).json("id desconocido");
    }
}

// ************* ACTUALIZAR USUARIOS ********************* */

exports.actualizarUsuarios = async (req, res) => {

    try{

        const { usuario, email, nombreUsuario, password, telefono, direccion, isAdmin } = req.body;
        const { _id } = req.params;

        const userFound = await Usuario.findById(_id);

        if(userFound)
        {
            userFound.usuario = usuario;
            userFound.email = email;
            userFound.nombreUsuario = nombreUsuario;
            userFound.password = password;
            userFound.telefono = telefono;
            userFound.direccion = direccion;
            userFound.isAdmin = isAdmin;

            userFound.save();
            res.json(userFound);

        }else {

            res.status(404).json(' id desconocido');
        }

    } catch(e) {

        console.log(` error : ${e}`)
    }
}

// *********** ACTUALIZAR EL ESTADO DE LOS USUARIOS *************** */

exports.actualizarEstadoUsuario = async (req, res) => {

    try{

        const { _id } = req.params;
        const { state } = req.body;

        const userFound = await Usuario.findById(_id);
        console.log(userFound)

        if(userFound)
        {
            userFound.state = state;
            userFound.save();
            res.json(`Estado del usuario actualizado:  ${state}`);
        }
    }catch(e){

        res.status(404).json(e.details[0].message)

    }
}

// ************* AGREGAR DIRECCION USUARIOS ********************* */

exports.agregarDireccion = async(req,res) => {

    try{

        const { direccion } = req.body;
        const user = await Usuario.findOne({ nombreUsuario: req.user.usernameU});
        user.direcciones.push({ direccion });

        user.save();
        res.json(user.direcciones)

    }catch(e){

        res.status(404).json(e.details[0].message)

    }
}

// ************* VER DIRECCION DE USUARIOS ********************* */

exports.verDirecciones = async(req,res) => {

    try{

        const user = await Usuario.findOne({nombreUsuario: req.user.usernameU});
        res.json(user.direcciones)

    }catch(e){

        res.status(404).json(e.details[0].message)

    }
}

// ************* ACTUALIZAR LA DIRECCION DE USUARIOS ********************* */

exports.actualizarDirecciones = async(req,res) => {

    try{

        const nuevaDireccion = req.body;

        const user = await Usuario.findOne({ nombreUsuario: req.user.usernameU });
        const direccionAmodificar = user.direcciones.id(req.params._id);

        if(direccionAmodificar)
        {
            direccionAmodificar.direccion = nuevaDireccion.direccion;
            await user.save();
            res.json(user)

        }else{

            res.json('no se ha encontrado la direccion')

        }
    }catch(e){

        res.status(404).json(e);
    }
}

// ************* ELIMINAR DIRECCION USUARIOS ********************* */

exports.eliminarDirecciones = async(req,res) => {

    try {

        const user = await Usuario.findOne({ nombreUsuario: req.user.usernameU });

        const direccionEliminar = user.direcciones.id(req.params._id);
        console.log(direccionEliminar)

        if(direccionEliminar)
        {
            direccionEliminar.remove();
            user.save();
            res.json(user)

        }else{

            res.json('no se ha encontrado algun producto')
        }
    }catch(e){
        
        console.log(e);
        res.status(404).json(e);
    }
}
