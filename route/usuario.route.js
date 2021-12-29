const express = require('express');
const router = express.Router();

// const Usuario = require('../models/usuario.model.js');

const accesoadministrador = require('../middleware/validationToken');

const user = require('../controllers/usuario.controllers');
// const middlewareUsuarios = require('../middlewares/validationToken.js');


//modifica los datos del usuario
/**
 * @swagger
 * 
 * /users/{id}:
 *  put:
 *      parameters:
 *      - in: path
 *        name: id
 *        description: id a editar
 *        required: true
 *        type: string
 *
 *      summary: modifica un usuario ya creado
 *      tags: [Usuarios]
 *      requestBody:
 *          description: los atributos del usuario a modificar
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/usuario'
 *      responses:
 *          200:
 *              description: usuario modificado
 *          400:
 *              description: entrada no valida
 *          401:
 *              description: acceso denegado
 */

router.put('/:_id', user.actualizarUsuarios);

//agrega una nueva direccion al usuario logueado
/**
 * @swagger
 * 
 * /users/nuevaDireccion:
 *  post:
 *      summary: agrega direccion a el usuario logueado
 *      tags: [Usuarios]
 *      requestBody:
 *          description: direccion a agregar
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/usuarioDireccion'
 *      responses:
 *          200:
 *              description: usuario modificado
 *          400:
 *              description: entrada no valida
 *          401:
 *              description: acceso denegado
 */

router.post('/nuevaDireccion', user.agregarDireccion);

// ver las direcciones que el usuario a agregado
/**
 * @swagger
 * /users/verDirecciones:
 *  get:
 *      summary: Obtener todas las direccion del usuario logueado
 *      tags: [Usuarios]
 *      responses:
 *          200:
 *              description: para esta ruta no es necesario body
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/usuarioDireccion'
 */

router.get('/verDirecciones', user.verDirecciones);

// para modificar las direcciones ya creadas
/**
 * @swagger
 * 
 * /users/actualizarDireccion/{id}:
 *  put:
 *      parameters:
 *      - in: path
 *        name: id
 *        description: id a editar
 *        required: true
 *        type: string
 *
 *      summary: modifica una direccion ingresada por el usuario logueado
 *      tags: [Usuarios]
 *      requestBody:
 *          description: la direccion actualizada
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/usuarioDireccion'
 *      responses:
 *          200:
 *              description: usuario modificado
 *          400:
 *              description: entrada no valida
 *          401:
 *              description: acceso denegado
 */
router.put('/actualizarDireccion/:_id', user.actualizarDirecciones)

// para eliminar una direccion creada
/**
 * @swagger
 * 
 * /users/eliminarDireccion/{id}:
 *  delete:
 *      parameters:
 *      - in: path
 *        name: id
 *        description: id de la direccion a eliminar
 *        required: true
 *        type: integer
 *
 *      summary: elimina una direccion ya creado
 *      tags: [Usuarios]
 *      requestBody:
 *          description: no necesitas ingresar atributos de la direccion a eliminar, con el id es suficiente.
 *          required: false
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/usuarioDireccion'
 *      responses:
 *          200:
 *              description: usuario modificado
 *          400:
 *              description: entrada no valida
 *          401:
 *              description: acceso denegado
 */

router.delete('/eliminarDireccion/:_id', user.eliminarDirecciones)

router.use(accesoadministrador.tokenAdministracion);
/**
 * @swagger
 * 
 * /users/{id}:
 *  delete:
 *      parameters:
 *      - in: path
 *        name: id
 *        description: id del usuario a eliminar
 *        required: true
 *        type: integer
 *
 *      summary: elimina un usario ya creado (solo habilitada para administrador)
 *      tags: [Usuarios]
 *      requestBody:
 *          description: no necesitas ingresar atributos del usuario a eliminar, con el id es suficiente.
 *          required: false
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/usuario'
 *      responses:
 *          200:
 *              description: usuario modificado
 *          400:
 *              description: entrada no valida
 *          401:
 *              description: acceso denegado
 */

router.delete('/:_id', user.eliminarUsuario);

//cambia el estado del usuario
/**
 * @swagger
 * 
 * /users/cambiarEstado/{id}:
 *  put:
 *      parameters:
 *      - in: path
 *        name: id
 *        description: id a editar
 *        required: true
 *        type: string
 *
 *      summary: modifica el estado de un usuario ya creado
 *      tags: [Usuarios]
 *      requestBody:
 *          description: el estado que se le quiere asignar al usuario
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/usuarioState'
 *      responses:
 *          200:
 *              description: usuario modificado
 *          400:
 *              description: entrada no valida
 *          401:
 *              description: acceso denegado
 */
router.put('/cambiarEstado/:_id', user.actualizarEstadoUsuario);

/**
 * @swagger
 * /users:
 *  get:
 *      summary: Obtener todos los usuarios del sistema (solo habilitada para administrador)
 *      tags: [Usuarios]
 *      responses:
 *          200:
 *              description: Lista de usuarios del sistema (solo habilitada para el administrador)
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/usuario'
 */

router.get('/', user.GetUsers);


/**
 * @swagger
 * name: Usuarios
 * description: User CRUD, signup and login.
 * components:
 *  schemas:
 *      usuario:
 *          type: object
 *          required:
 *              -usuario
 *              -email
 *              -username
 *              -password
 *              -telefono
 *              -direccion
 *          properties:
 *              usuario:
 *                  type: string
 *                  description : nombre del usuario
 *              email:
 *                  type: string
 *                  description: correo del usuario
 *              username:
 *                  type: string
 *                  description: alias unico del usuario
 *              password:
 *                  type: string
 *                  description: clave de acceso del usuario
 *              telefono:
 *                  type: number
 *                  description: numero contacto del usuario
 *              direccion:
 *                  type: string
 *                  description: destino de los domicilios solicitados por el usuario
 *
 */

//para modificar el estado de un usuario

/**
 * @swagger
 * name: Usuarios State
 * description: User CRUD, signup and login.
 * components:
 *  schemas:
 *      usuarioState:
 *          type: object
 *          required:
 *              -state
 *          properties:
 *              state:
 *                  type: string
 *                  description : estado del usuario
 *
 */



// para agregar una nueva direccion al usuario logueado
/**
 * @swagger
 * name: Usuarios direccion
 * description: User CRUD, signup and login.
 * components:
 *  schemas:
 *      usuarioDireccion:
 *          type: object
 *          required:
 *              -direccion
 *          properties:
 *              direccion:
 *                  type: string
 *                  description : direccion a agregar al usuario logueado
 *
 */

module.exports = router;
