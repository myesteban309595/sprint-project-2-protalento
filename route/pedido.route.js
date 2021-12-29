const express = require('express');
const pedRoutes = express.Router();
const user = require('../controllers/pedido.controllers')
const adminAcces = require('../middleware/validationToken');

// ruta ver pedido usuario logueado
/**
 * @swagger
 * /pedidos/verPedido:
 *  get:
 *      summary: obtiene le pedido pendiente del usuario
 *      tags: ['Pedidos']
 *      responses:
 *          200:
 *              description: Pedido pendiente obtenido con exito
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/pedidos'
 *          401:
 *              description: solo disponible para usuarios logueados
 */

pedRoutes.get('/verPedido', user.verificarOrdenes);

// ruta para ver historial de pedido del usuario logueado
/**
 * @swagger
 * /pedidos/verHistorialPedidos:
 *  get:
 *      summary: obtiene todos los pedidos tanto pendientes como confirmados del usuario
 *      tags: ['Pedidos']
 *      responses:
 *          200:
 *              description: Pedidos obtenidos con exito
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/pedidos'
 *          401:
 *              description: solo disponible para usuarios logueados
 */

pedRoutes.get('/verHistorialPedidos', user.obtenerTodasOrdenes);

//ruta para agregar un producto al pedido
/**
 * @swagger
 * 
 * /pedidos/producto/{id}:
 *  post:
 *      parameters:
 *      - in: path
 *        name: id
 *        description: id del producto a agregar
 *        required: true
 *        type: integer
 *
 *      summary: agrega el producto a la orden que tengas en estado pendiente, el usuario debe estar logueado
 *      tags: ['Pedidos']
 *      requestBody:
 *          description: el username no es requerido para esta ruta, con el id es suficiente
 *          required: false
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/pedidos'
 *      responses:
 *          200:
 *              description: producto agregado
 *          400:
 *              description: id no valido
 *          401:
 *              description: acceso denegado
 */

pedRoutes.post('/producto/:_id', user.agregarProducto);

//ruta para eliminar un producto del pedido
/**
 * @swagger
 * 
 * /pedidos/producto/{id}:
 *  delete:
 *      parameters:
 *      - in: path
 *        name: id
 *        description: id del producto a eliminar
 *        required: true
 *        type: integer
 *
 *      summary: elimina el producto solicitado del pedido pendiente del usuario logueado
 *      tags: ['Pedidos']
 *      requestBody:
 *          description: no es necesario enviar un body para esta solicitud
 *          required: false
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/pedidos'
 *      responses:
 *          200:
 *              description: producto eliminado
 *          400:
 *              description: id no valido
 *          401:
 *              description: acceso denegado
 */

pedRoutes.delete('/producto/:_id', user.eliminarProducto);

//ruta para poner un medio de pago en la orden
/**
 * @swagger
 * 
 * /pedidos/medioDePago/{id}:
 *  put:
 *      parameters:
 *      - in: path
 *        name: id
 *        description: id del medio de pago que se quiere utilizar
 *        required: true
 *        type: integer
 *
 *      summary: proporciona el medio de pago a utilizar "debe ser un medio de pago existente en la aplicacion"
 *      tags: ['Pedidos']
 *      requestBody:
 *          description: no necesitas ingresar el username del usuario logueado, con el id es suficiente
 *          required: false
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/pedidosMedioDePago'
 *      responses:
 *          200:
 *              description: medio de pago elegido
 *          400:
 *              description: id no valido
 *          401:
 *              description: acceso denegado
 */

pedRoutes.put('/medioDePago/:_id', user.actualizarMetodoPago);

//ruta para cambiar la direccion que aparece en el pedido
/**
 * @swagger
 * 
 * /pedidos/cambioDireccion/{id}:
 *  put:
 *      parameters:
 *      - in: path
 *        name: id
 *        description: id de la orden a la que queremos cambiarle la direccion
 *        required: true
 *        type: integer
 * 
 *      summary: modifica la direccion al pedido del usuario logueado
 *      tags: ['Pedidos']
 *      requestBody:
 *          description: direccion actualizada del usuario logueado
 *          required: false
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/pedidosDireccion'
 *      responses:
 *          200:
 *              description: direccion actualizada
 *          400:
 *              description: usuario no logueado
 *          401:
 *              description: acceso denegado
 */

pedRoutes.put('/cambioDireccion/:_id', user.actualizarDireccion);

// ruta para agregar una direccion que el cliente tiene guardada en su lista de direcciones
/**
 * @swagger
 * 
 * /pedidos/direccionGuardada/{id}:
 *  put:
 *      parameters:
 *      - in: path
 *        name: id
 *        description: id de la direccion que queremos agregar
 *        required: true
 *        type: integer
 * 
 *      summary: modifica la direccion al pedido del usuario logueado
 *      tags: ['Pedidos']
 *      requestBody:
 *          description: no es necesario poner la direccion en el body con el id es suficiente
 *          required: false
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/pedidosDireccion'
 *      responses:
 *          200:
 *              description: direccion actualizada
 *          400:
 *              description: usuario no logueado
 *          401:
 *              description: acceso denegado
 */

pedRoutes.put('/direccionGuardada/:_id', user.agregarDireccion);

// ruta para confirmar pedido del usuario logueado
/**
 * @swagger
 * 
 * /pedidos/confirmarPedido/{id}:
 *  put:
 *      parameters:
 *      - in: path
 *        name: id
 *        description: id del pedido que se quiere confirmar
 *        required: true
 *        type: integer
 *
 *      summary: confrima el pedido que el usuario tiene pendiente
 *      tags: ['Pedidos']
 *      requestBody:
 *          description: poner estado confirmado
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/pedidosConfirmar'
 *      responses:
 *          200:
 *              description: pedido confirmado
 *          400:
 *              description: estado no valido
 *          401:
 *              description: acceso denegado
 */

pedRoutes.put('/confirmarPedido/:_id', user.cofirmarOrden);

// ruta para crear orden
/**
 * @swagger
 * 
 * /pedidos/crearPedido:
 *  post:
 *      summary: crea un pedido con tu usuario logueado
 *      tags: ['Pedidos']
 *      requestBody:
 *          description:  la direccion a la que quieres que llegue tu producto
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/nuevoPedido'
 *      responses:
 *          200:
 *              description: pedido creado
 *          400:
 *              description: solicitud no valida
 *          401:
 *              description: acceso denegado
 */
pedRoutes.post('/:_id', user.crearOrden);


//middlewareAdmin
pedRoutes.use(adminAcces.AdministrationToken);

//ruta para cambiar el estado del pedido (solo administrador)
/**
 * @swagger
 * 
 * /pedidos/cambiarEstadoPedido/{id}:
 *  put:
 *      parameters:
 *      - in: path
 *        name: id
 *        description: id del pedido que se quiere cambiar
 *        required: true
 *        type: integer
 *
 *      summary: modifica el estado pedido seleccionado (solo habilitado para administrador)
 *      tags: ['Pedidos']
 *      requestBody:
 *          description: poner estado a cambiar puede ser ( pendiente, confirmado, en preparacion, enviado, entregado)
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/pedidosConfirmar'
 *      responses:
 *          200:
 *              description: pedido confirmado
 *          400:
 *              description: estado no valido
 *          401:
 *              description: acceso denegado
 */

pedRoutes.put('/cambiarEstadoPedido/:_id', user.actualizarEstadoOrden);

// ruta para ver todos los pedidos (solo administrador)
/**
 * @swagger
 * /pedidos:
 *  get:
 *      summary: obtiene todos los pedidos (solo habilitado para administrador)
 *      tags: ['Pedidos']
 *      responses:
 *          200:
 *              description: Pedidos obtenidos con exito
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/pedidos'
 *          401:
 *              description: solo disponible para usuario administrador
 */

pedRoutes.get('/', user.obtenerOrdenes);

// ruta para los bodies que trabajen con username
/**
 * @swagger
 * tags:
 *  name: 'Pedidos'
 *  descripcion: en relacion con los pedidos de la aplicacion
 * components:
 *  schemas:
 *      pedidos:
 *          type: object
 *          required:
 *              -userName
 *          properties:
 *              userName:
 *                  type: string
 *      productResponse:
 *          type: object
 *          required:
 *              -userName
 *          properties:
 *              productName:
 *                  type: string
 *              price:
 *                  type: integer
 *
 */

//ruta para bodies que trabajen con medio de pago
/**
* @swagger
* tags:
*  name: 'Pedidos'
*  descripcion: en relacion con los pedidos de la aplicacion
* components:
*  schemas:
*      pedidosMedioDePago:
*          type: object
*          required:
*              -username
*          properties:
*              username:
*                  type: string
*      productResponse:
*          type: object
*          required:
*              -username
*          properties:
*              username:
*                  type: string
*
*/
// ruta para bodies que trabajen con correo
/**
 * @swagger
 * tags:
 *  name: 'Pedidos'
 *  descripcion: en relacion con el cambio de la direccion de los pedidos de la aplicacion
 * components:
 *  schemas:
 *      pedidosDireccion:
 *          type: object
 *          required:
 *              -direccion
 *          properties:
 *              direccion:
 *                  type: string
 *      productResponse:
 *          type: object
 *          required:
 *              -direccion
 *          properties:
 *              direccion:
 *                  type: string
 *
 */

// ruta para bodies que trabajen con estados de la aplicacion
/**
 * @swagger
 * tags:
 *  name: 'Pedidos'
 *  descripcion: en relacion con los estados de los pedidos de la aplicacion
 * components:
 *  schemas:
 *      pedidosConfirmar:
 *          type: object
 *          required:
 *              -state
 *          properties:
 *              state:
 *                  type: string
 *      productResponse:
 *          type: object
 *          required:
 *              -state
 *          properties:
 *              state:
 *                  type: string
 *
 */

// para crear pedido
/**
 * @swagger
 * tags:
 *  name: 'nuevoPedido'
 *  descripcion: en relacion con los pedidos de la aplicacion
 * components:
 *  schemas:
 *      nuevoPedido:
 *          type: object
 *          required:
 *              -direccion
 *          properties:
 *              direccion:
 *                  type: string
 *      productResponse:
 *          type: object
 *          required:
 *              -direccion
 *          properties:
 *              direccion:
 *                  type: string
 *
 */


module.exports = pedRoutes;
