
const mongoose = require('mongoose');

const addresSchema = new mongoose.Schema({

    direccion: {
        type: String
    }

});

const datosUsuario = new mongoose.Schema({

    usuario: {

        type : String,
        require: true
    },

    email: {

        type : String,
        require: true
    },

    nombreUsuario: {

        type : String,
        require: true
    },
    password: {

        type : String,
        require: true
    },
    telefono: {

        type : String,
        require: true
    },

    direccion : [addresSchema],

    isAdmin: {

        type : Boolean,
        require: true
    },
    estado: {

        type : String,
        default: 'activo'  // que el administrador pueda suspender un usuario
    }

});

module.exports= mongoose.model('Usuario', datosUsuario);