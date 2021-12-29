// npm install swagger-ui-express
// npm install swagger-jsdoc --save

//***** configuracion del puerto de escucha PORT  ********* */
const config = require('./config');
//**************      EXPRESS Y MORGAN   ****************** */
const express = require('express');
const morgan = require('morgan');
const app = express();

const PORT = config.module.PORT;
// ¨************** ruta usuario ************************** */
const usuarioRoutes = require('../route/usuario.route');
//********************* SWAGGER ************************** */
const swaggerOptions = require('../utils/swaggerO');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

require('./db');

//****************  SEGURIDAD HELMET ********************* */
const helmet = require('helmet');
//******************************************************** */


const validationToken = require('../middleware/validationToken');

app.use(morgan('dev'));
app.use(helmet()); // SEGURIDAD

const swaggerSpecs = swaggerJsDoc(swaggerOptions);

app.use(express.json());

// ***********************  app ************************** */

app.use('/swaggerAPI', swaggerUI.serve, swaggerUI.setup(swaggerSpecs)); // http://localhost:3000/swaggerAPI
app.use(validationToken.exJwt, validationToken.validationToken);
app.use('/cuenta', require('../route/loginaccount.route'));
app.use('/mediosDePago', require('../route/metodopago.route'));
app.use('/users', usuarioRoutes);
app.use('/productos', require('../route/producto.route'));
app.use('/pedidos', require('../route/pedido.route'));

//********** CONFIGURACION DEL PUERTO DE ESCUCHA ********* */
app.listen(PORT, () => 
{
    console.log('escuchando en el puerto ' + PORT)
    
});

module.exports = app;


// npm i mocha
// npm i chai-http
// npm install --save-dev chai
// npm install jsonwebtoken
// npm install redis
// npm install express-basic-auth
// npm install bcrypt
// npm install dotenv
// npm install express
// npm install express-basic-auth
// npm install express-jwt
// npm i helmet
// npm install joi
// npm i jsonwebtoken
// npm i mongoose
// npm i morgan
// npm i redis
// npm i swagger-jsdoc
// npm i swagger-ui-express
// npm i chai
