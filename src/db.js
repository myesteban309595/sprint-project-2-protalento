
const mongoose = require('mongoose');

const { getMaxListeners } = require('../models/usuario.models');

const Usuario = require('../models/usuario.models');
const Producto = require('../models/productos.models');
const MetodosPago = require('../models/metodospago.models');

const config = require('../src/config'); //contenido de informacion sensible del dotenv

const bcrypt = require('bcrypt');  // encriptado de contraseña

require('dotenv').config();

//** llamamos la informacion sensible almacenada en el .config ** */

const MONGOOSE_URL = config.module.MONGOOSE_URL;
const PASSWORDUSER1 = config.module.PASSWORDUSER1;
const PASSWORDUSER2 = config.module.PASSWORDUSER2;

//*************************************************************** */

(async () => { await mongoose.connect(MONGOOSE_URL,
    { useNewUrlParser: true, useUnifiedTopology: true});

    console.log('conectado a la DATA BASE desde MongoDB');

    // ********************** USUARIO BD ************************* */

    const usuarioExiste = await Usuario.find();

    if(usuarioExiste.length == 0 )
    {
        // usuario administrador

        const User1 = new Usuario(
            
        {

            usuario : 'marlon',
            email: 'maryoe@hotmail.com',
            nombreUsuario: 'myesteban',
            password: bcrypt.hashSync(PASSWORDUSER1, 3), // encriptar hasta 3 veces
            telefono: 3194329073,
            direccion: 'santa rita',
            isAdmin : true,
            estado: 'activo'

        })

        // usuario NO administrador

        const User2 = new Usuario(

        {
            usuario : 'cristian',
            email: 'cristian@gmail.com',
            nombreUsuario: 'cris10',
            password: bcrypt.hashSync(PASSWORDUSER2, 3), // encriptar hasta 3 veces
            telefono: 3142411194,
            direccion: 'casa e tambo',
            isAdmin : false,
            estado: 'activo'

        })

            User1.save(); // Guarda en la BD
            User2.save();
    };

    // ********************** PRODUCTO BD ************************ */

    const productoExiste = await Producto.find();

    if( productoExiste.length == 0 )
    {
        const Producto1 = new Producto({
            nombreProducto: 'Hamburguesa pollo',
            precio: 10000,
        })

        const Producto2 = new Producto({
            nombreProducto: 'Hamburguesa carne',
            precio: 12000,
        })

        const Producto3 = new Producto(
        {
            nombreProducto: 'Pepsi',
            precio: 2000,
        })

        const Producto4 = new Producto(
        {
            nombreProducto: 'coca cola',
            precio: 2000,
        })

        Producto1.save(); // Guarda en la BD
        Producto2.save();
        Producto3.save();
        Producto4.save();

    };

    // ******************** MEDIOS PAGO BD *********************** */

    const existeMetodosPago = await MetodosPago.find();

    if ( existeMetodosPago.length == 0 )
    {
        const medioDePago1 = new MetodosPago(
            {

              medioDePago: "efectivo",

            })

        const medioDePago2 = new MetodosPago(

            {

            medioDePago: "tarjeta",

            })

        medioDePago1.save(); // Guarda en la BD
        medioDePago2.save();
    }


})();

