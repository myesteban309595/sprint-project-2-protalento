const express = require('express');
const cRoute = express.Router();
const user = require('../controllers/account.controllers');


/**
 * @swagger
 * /cuenta/crearCuenta:
 *  post:
 *      summary: Crea un nuevo usuario en el sistema
 *      tags: [Cuenta]
 *      security: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/crearCuenta'
 *      responses:
 *          201:
 *              description: Usuario creado
 *          400: 
 *              description: Entradas inválidas
 *          401:
 *              description: usuario y contrasena incorrectos
 */


cRoute.post('/crearCuenta', user.createAccount);

/**
 * @swagger
 * /cuenta/login:
 *  post:
 *      summary: loguea un usuario creado y da a conocer su token
 *      tags: [Cuenta]
 *      security: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/login'
 *      responses:
 *          201:
 *              description: Usuario creado
 *          400: 
 *              description: Entradas inválidas
 *          401:
 *              description: usuario y contrasena incorrectos
 */

cRoute.post('/login', user.login);

// ruta para crear usuario
/**
 * @swagger 
 * tags: 
 *  name : 'Cuenta'
 *  description: 'Registro e inicio de sesión'
 * 
 * components: 
 *  schemas:
 *      crearCuenta: 
 *          type: object
 *          required:
 *               -usuario
 *               -email
 *               -username
 *               -password
 *               -telefono
 *               -direccion
 *          properties:
 *              usuario:
 *                  type: string
 *              email:
 *                  type: string
 *              username:
 *                  type: string
 *              password:
 *                  type: string
 *              telefono:
 *                  type: number
 *              direccion:
 *                  type: string
 *      productResponse:
 *          type: object
 *          required:
 *               -usuario
 *               -email
 *               -username
 *               -password
 *               -telefono
 *               -direccion
 *          properties:
 *               usuario::
 *                  type: string
 *               email:
 *                  type: string
 *               username:
 *                  type: string
 *               password:
 *                  type: number
 *               telefono:
 *                  type: number
 *               direccion:
 *                  type: string
 *                  $ref: '#/components/schemas/crearCuenta'
 */

// ruta para loguearse
/**
 * @swagger 
 * tags: 
 *  name : 'Cuenta'
 *  description: 'inicio de sesión'
 * 
 * components:
 *  schemas:
 *      login:
 *          type: object
 *          required:
 *               -username
 *               -password
 *          properties:
 *              username:
 *                  type: string
 *              password:
 *                  type: string
 *      productResponse:
 *          type: object
 *          required:
 *               -username
 *               -password
 *          properties:
 *               username:
 *                  type: string
 *               password:
 *                  type: number
 *                  $ref: '#/components/schemas/login'
 */

module.exports = cRoute;
