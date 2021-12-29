const  Usuario = require('../models/usuario.models');
const  UsuarioSchema = require('../schemas/joi.usuario');
const loginSchema = require('../schemas/joi.login');

const bcrypt = require('bcrypt');
const config = require('../src/config');

const jsonwebtoken = require('jsonwebtoken');

ACCESO = config.module.ACCESO;

exports.createAccount = async (req,res) => {

    try{

        const {usuario, email, nombreUsuario, password, telefono, direccion , isAdmin} = req.body;
        const result = await UsuarioSchema.validateAsync(req.body);

        if (result)
        {
            const existeUsuario = await Usuario.findOne({ email });

            if(usuario &&  email && nombreUsuario && password && telefono && direccion) 
            {
                if(existeUsuario)
                {
                    res.status(404).json('el email ingresado esta en uso'); // VALIDACION USAURIO YA EXISTENTE
                    
                }else{
                    const nuevoUsuario = new Usuario({

                      usuario,
                      email,
                      nombreUsuario,
                      password: bcrypt.hashSync(password, 3), // ENCRIPTACION HASTA 3 VECES
                      telefono,
                      direccion,
                      isAdmin
                    });

                    nuevoUsuario.direcciones.push({ direccion })
                    nuevoUsuario.save();

                    res.status(201).json('su cuenta ha sido creada');
                };

        } else {

            res.status(400).json(e.details[0].message)
        }
        }else{

            res.status(404).json('Por favor ingrese completamente los datos');
        };
    }
    catch (e){

        res.status(400).json(e.details[0].message)
    }
}

exports.login = async (req,res) => {

   try{

       const { nombreUsuario, password } = await loginSchema.validateAsync(req.body);

        if( nombreUsuario && password) 
        {
            const {usuario, email, password: passwordUser, esAdmin, nombreUsuario: usernameU, state, _id } = await Usuario.findOne({nombreUsuario});

            const resultado = bcrypt.compareSync(password, passwordUser);
            console.log(resultado);

            if(resultado && state == 'activo')
            {

                const token = jsonwebtoken.sign({

                  usernameU,
                  usuario,
                  esAdmin,
                  email,

                },ACCESO);

                res.json(`bienvenid@ ${nombreUsuario}, tu token es ${ token } y tu id es ${_id} `);

            }else{

            res.status(401).json('unauthorized');

        };
      } else {

          res.status(401).json('ingresa nombreUsuario y password para loguearte');

      };
   }catch (e){
       
       res.status(404).json(e);
   }
}
