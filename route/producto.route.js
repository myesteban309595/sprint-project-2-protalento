const express = require('express');
const productRoute = express.Router();

const user = require('../controllers/products.controllers');
const adminMiddleware = require('../middleware/validationToken')


/**
 * @swagger
 * /productos:
 *  get:
 *      summary: obtiene todos los productos disponibles
 *      tags: ['Productos']
 *      responses:
 *          200:
 *              description: Productos disponibles obtenidos con exito
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/product'
 *          401:
 *              description: solo usuarios logueados
 */
productRoute.get('/', adminMiddleware.cache,user.GetProducts);

productRoute.use(adminMiddleware.AdministrationToken); // solo administrador

/**
 * @swagger
 * /productos:
 *  post:
 *      summary: Agrega un nuevo producto para la venta (solo habilitado para el administrador)
 *      tags: [Productos]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/product'
 *      responses:
 *          201:
 *              description: Producto agregado exitosamente
 *          400:
 *              description: Datos no validos
 *          401:
 *              description: logueo de administrador inválido
 */
productRoute.post('/', user.createProduct);

/**
 * @swagger
 * 
 * /productos/{id}:
 *  put:
 *      parameters:
 *      - in: path
 *        name: id
 *        description: id del producto a editar
 *        required: true
 *        type: integer
 *
 *      summary: modifica un producto ya creado (solo habilidato para administrador)
 *      tags: [Productos]
 *      requestBody:
 *          description: El producto  modificado con su precio
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/product'
 *      responses:
 *          200:
 *              description: Producto modificado
 *          400:
 *              description: entrada no valida
 *          401:
 *              description: acceso denegado
 */

productRoute.put('/:_id', user.updateProduct, adminMiddleware.cache); // solo administrador

/**
 * @swagger
 * /productos/{id}:
 *  delete:
 *      parameters:
 *      - in: path
 *        name: id
 *        description: id del producto que desea eliminar
 *        required: true
 *        type: integer
 *      summary: eliminar un producto existente (solo habilitado para administrador)
 *      tags: [Productos]
 *      requestBody:
 *          description: no necesitas ingresar atributos para eliminar el producto con el id es suficiente
 *          required: false
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/product'
 *      responses:
 *          200:
 *              description: Producto eliminado
 *          400:
 *              description: la solicitado no fueron ingresados correctamente
 *          401:
 *              description: acceso restringido
 */
productRoute.delete('/:_id', user.deleteProduct);


/**
 * @swagger
 * tags:
 *  name: 'Productos'
 *  descripcion: en relacion con los productos de la aplicacion
 * 
 * components:
 *  schemas:
 *      product:
 *          type: object
 *          required:
 *              -nombreProducto
 *              -precio
 *          properties:
 *              nombreProducto:
 *                  type: string
 *              precio: 
 *                  type: integer
 *      productResponse:
 *          type: object
 *          required:
 *              -nombreProducto
 *              -precio
 *          properties:
 *              nombreProducto:
 *                  type: string
 *              price:
 *                  type: integer
 *
 */



module.exports = productRoute;
