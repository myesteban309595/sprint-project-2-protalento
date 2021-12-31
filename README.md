
# Sprint project 2 PROTALENTO (Api restaurant delilah restó)


El fin de este proyecto, es la administracion, gestion y control de un restaurante dedicado a la venta de alimentos, en el podemos realizar operaciones CRUD, las que me permiten agregar, actualizar, obtener o eliminar productos, bien sea desde el ambiente administrador, o como cliente. Como administradores de la plataforma podemos obtener las ordenes y pedidos de nuestros clientes, conocer su informacion y los productos de su interés, tambien los clientes pueden visualizar el menú completo y hacer peticiones de los productos a su gusto dandole la flexibilidad de guardar varias direcciones de envio, medios de pago y cantidad de productos, cabe resaltar que los clientes solo pueden tener un pedido activo a la vez, y tambien pueden realizar operaciones CRUD sobre sus pedidos antes de que este sea finalizado, una vez finalizado se bloquearán estas operaciones.

## Proceso de instalacion

 descarga el respositorio en el siguiente link[repositorio GITHUB](https://github.com/myesteban309595/sprint-project2-protalento), una vez descargado instala los paquetes necesarios y se implemetó con una base de datos trabajada desde mongoose, por consiguiente debes cumplir los siguientes requerimientos:

 - Tener mongodb en tu ordenador, la direccion por defecto para mongoose es " mongodb://localhost:27017/restaurante ",
   donde "restaurante" denota la base de datos en la cual se ejecutará, si tienes mongodb como servicio debes 
   ejecutarse desde una terminal independiente con el siguiente comando: 'mongod', si la base de datos "restaurante" no ha sido creada posteriormente, esta se creará automaticamente.
 
 - Tener redis instalado para usar la caché, su puerto por defecto es "6379". , si deseas ejecutarlo desde otro, debes modificar la variable de        entorno que se encuentra en el archivo ".env" .

-  descomprimir el documento en formato .zip , abrir la carpeta en visual Studio Code.

- ejecutar el comando en la terminal:


```bash
npm install
```

## Arranque 

Antes de dar inicio, se debe poner a correr la base de datos de mongodb, recuerda que si esta como servicio puedes abrir la terminal y poner mongod para ejecutarlo

1. Arrancamos el proyecto con el siguiente comando:

```bash
node src/index.js
```
o

```bash
npm run dev
```

Para realizar testing en la creacion de una cuenta, ejecutamos el siguiente comando:

```bash
npm run test
```
## Visualizacion y documentacion  

2.  Para ingresar a la documentacion e interactuar con los endpoints de la API, ingresamos al siguiente enlace una vez corriendo el programa , swagger [documentacion Swagger](http://localhost:3000/swaggerAPI/)

3. Para ingresar como administrador, se ha fijado un user default que es myesteban y su contraseña es xxxxxxx, con este usuario de administrador puedes acceder a cada una de las rutas de la API, tambien puedes ingresar creando un nuevo usuario ingresando a la ruta /cuenta/crearCuenta, el cual luego de ingresar te asignará un token que deberá ponerse en el authorize para permitirte acceso a las rutas habilitadas para un usuario en la API, tambien puedes ingresar con un usuario ya predeterminado que se encuentra en la base de datos por defecto con user: cris10 y contraseña: yyyyyy, 

### Routes availables for the user

4. En la ruta POST/cuenta/crearCuenta podras crear una nueva cuenta sumistrando la informacion requerida como se muestra a continuacion. 

```javascript
{
  "usuario": "ingrid paola",
  "email": "ingrid@gmail.com",
  "nombreUsuario": "ingridpao",
  "password": "0204",
  "telefono": 3004508965,
  "direccion": "santa rita magangue"
}
```
5. Verificamos que el usuario halla sido creado ingresando a la ruta POST/cuenta/login y con ayuda del nombreusuario y la contraseña podemos ingresar a la API si el usuario esta creado en la base de datos. 

```javascript
{
  "nombreUsuario": "ingridpao",
  "password": "0204"
}
```

En responses body se mostrará el siguiente mensaje "bienvenido ingridpao tu token es example234352..... y tu id es 132345..... "

IMPORTANTE! : ingresar el token adquirido en el authorized.

6. Para crear un pedido nos dirigimos a la ruta POST/pedidos/crearPedido,  y con el authorize y el token adquirido se creará una orden vacia disponible para comenzar a agregar los productos deseados. Una vez creada la orden, en response te aparece una mensaje como este: "orden creada, por favor ingnresa tu seleccion de productos".

7. para visualizar el "carrito" o los pedidos realizados, nos dirigimos a la ruta  GET/pedidos/verPedido y te mostrará una orden vacia similar al que se presenta a continuacion:

```javascript
{
  "orderCost": 0,
  "medioDePago": "efectivo",  // pago por defecto, puede elegirse otro tipo de pago
  "state": "pendiente"
  "_id": "exampleid23423543534",
  "username": "ingridpao",
  "direccion": "santa rita magangue",
  "products": [],
  "__v":0
}
```
8. Para añadir productos, primero debemos visualizar los productos ofertados, para eso nos dirigimos a la ruta GET/productos puedes ver todos los productos que se encuentran activos en el restaurante, cada uno de ellos vendran identificados con un id mediante los cuales se haran las peticiones para agregar al pedido.

9. Con ayuda de la ruta POST/pedidos/producto/{id} podremos agregar un producto al pedido con ayuda del id del producto que es unico para cada uno. Para ingresar el id, debes poner el id como numero entero como se muestra POST/pedidos/producto/2, esto agregará a tu pedido el producto en lista con id = 2. Puedes adicionar la cantidad que desees de cada producto y editar la cantidad de productos a pedir antes de finalizar la compra, se mostrará el valor unitario del producto y el valor total de la orden.


```javascript
{
  "orderCost": 29000,
  "medioDePago":"efectivo",
  "orderState": "pendiente"
  "_id": "exampleid23423543534",
  "nombreUsuario": "ingridpao",
  "direccion": "santa rita magangue",
  "products": [
    {
      "quantity":2,
      "_id": "6130e5b2accb5229308078bf",
      "price": 14500,
      "productName": "picada personal",
      "productCost": 29000
    }
  ],
  "__v": 0
}
```

10. En la ruta DELETE/pedidos/producto/{id} puedes eliminar cualquier producto de los seleccionados anteriormente, ingresa su id en la casilla habilitada en el interior de la ruta, al eliminarlo el costo del pedido debe ser igual a la sumatoria del costo de los productos que queden en el pedido.

11. En la ruta GET/mediosDePago vas a poder observar los medios de pago disponibles.

12. En la ruta PUT/pedidos/medioDePago vas a poder especificar el medio de pago que quieres usar para pagar el pedido que estas solicitando. El pago en efectivo esta fijado por default.

13. En la ruta PUT/pedidos/cambioDireccion/{id} podras agregar la direccion a la que quieres que llegue tu pedido, debes poner el id de la orden a la que quieres cambiarle la direccion, para ingresar la nueva direccion lo hacemos de la siguiente manera

```javascript
{
  "direccion": "direcccion corregida o actualizada"
}
```
12.1 En la ruta POST/users/nuevaDireccion se agregar las direcciones que se deseen, se deben enviar una a una por el body y se creara un array de direcciones guardadas, para crear nuevas direcciones se envia de la siguiente manera.

```javascript
{
  "direccion": "direccion a guardar"
}
```

el response mostrará todas las direcciones incluyendo la que acabas de crear, tambien mediante la ruta GET/users/verDirecciones.

12.2 En la ruta PUT/users/actualizarDireccion/{id} por medio del id se actualizan las direcciones y se ingresa mediante el body la direccion actualizada, aparecerá todos los datos del usuario con la direccion actualizada.

12.3 En la ruta  DELETE/users/eliminarDireccion/{id} podemos eliminar las direcciones que ya no esten en uso mediante el id.

12.4 Para seleccionar una de las direcciones guardadas al pedido pendiente nos dirigimos la ruta PUT/pedidos/direccionGuardada/{id} y mediante el id de la direccion del pedido, podras asociarla o adjuntarla a tu pendido pendiente.

13. En la ruta PUT/pedidos/confirmarPedido/{id} podemos modificar el estado de un pedido para confirmar y cerrar la orden, una vez esto se iniciará el enlistamiento del mismo. Se debe pasar por el body el estado de la siguiente manera:

```javascript
{
  "state": "confirmado" // tener en cuenta que existen otros estados disponibles
}
```

y por medio de la casilla habilitada dentro de la ruta poner el id del pedido al cual se le quiere modificar el estado (este id lo puedes ver en las rutas mencionadas en los numerales 12, 11, 9 y 8 en los cuales modificadas el pedido.

14. En la ruta GET/pedidos/verHistorialPedidos vas a poder ver el pedido que acabas de confirmar y deberas ir a la ruta mencionada en el numeral 6 para crear una nueva orden ya que las ordenes cerradas no se pueden modificar, solo crear una nueva.

15. En la ruta PUT/users/{id} se podra modificar el usuario creado. se debe ingresar en la casilla habilitada dentro de la ruta el id del usuario a editar (este lo puedes verificar en el numeral 5 en el response aparece el username y el id que le corresponde al usuario), en el body se ingresan los datos que se desean modificar. ( IMPORTANTE!! recuerda que debes estar logueado con username y password en el autorize para ejecutar esta accion).

### Rutas Administrador ( usar el usuario y contraseña en el autorize mencionado en el numeral 3).

17. En la ruta POST/mediosDePago puedes agregar un medio de pago enviandolo por el body de la siguiente manera.

```javascript
{
  "medioDePago": "aqui se agrega el nuevo metodo de pago" // uno que no exista en la API
}
```

responses: apareceran todos los medios de pago incluyendo el recien ingresado.

18. En la ruta DELETE/mediosDePago ingresando el id por la casilla habilitada eliminaras el medio de pago correspondiente a el id ingresado. (recuerda que debes loguearte como administrador y poner el token en el authorize los datos del administrador estan en el numeral 3).

19. En la ruta PUT/nuevoMediosDePago/{id} puedes actualizar los medios de pago existentes, en la casilla habilitada debes poner el id del medio de pago que deseas editar, y por el body enviar el medio de pago que quieres ingresar de la siguiente manera :

```javascript
{
  "medioDePago": "nuevo medio de pago"
}
```

20. En la ruta PUT/pedidos/cambiarEstadoPedido/{id} se puede cambiar el estado de las ordenes creadas, se debe enviar el id en la casilla habilitada del pedido que se quiere modificar, y en el body enviar el estado que se desea poner. (" estados de la orden :  'pendiente', 'confirmado', 'en preparacion', 'enviado', 'entregado', verifica el estado nuevamente "), algo asi debera ir en el body:

```javascript
{
  "state": "en preparacion"
}
```
response: "estado actualizado".

21. En la ruta GET/pedidos se obtienen todas los pedidos realizados en la aplicacion.

22. En la ruta POST/productos podras agregar un nuevo producto, debes ingresar por el body el nombre y el precio del producto de la siguiente manera:

```javascript
{
  "productName": "nuggets",
  "price": 8500
}
```
responses:  aparece el producto creado con su respectivo id y cantidad "quantity" de la siguiente manera:

```javascript
{
  "id_": "6130fc5030688b223095af8d",
  "productName": "nuggets",
  "price": 8500,
}
```
22. En la ruta PUT/productos/{id} podras modificar productos ya creados, ingresando en la casilla habilitada el id del producto que quieres editar y en el body su nuevo nombre y precio de la siguiente manera:

```javascript
{
  "productName": "chicken nuggets",
  "price": 9000
}
```
responses:  aparece el producto con la informacion actualizada, si vas a la ruta GET/productos y le das execute vas a ver todos los productos incluyendo el actualizado.

23. En la ruta DELETE/productos/{id} puedes eliminar los productos habilitados para la venta, debes ingresar el id del producto que quieres eliminar en la casilla habilitada y en el responses apareceran todos los productos excepto el que acabas de eliminar, estos productos se veran reflejados con un delay en la ruta mencionada en el numeral 7 a causa de redis y el uso del cache.

24. En la ruta DELETE/users/{id} podras eliminar los usuarios existentes, debes ingresar el id en la casilla habilitada del usuario que quieres eliminar y en el responses una vez eliminado deben aparecer todos los usuarios excepto el que acabas de eliminar.

25. En la ruta  GET/users puedes obtener todos los usuarios con una cuenta habilitada en la aplicacion.

26. en la ruta PUT/cambiarEstado/{id} podras cambiar el estado del usuario de "activo" a "suspendido" para inactivar su accion y que este se pueda loguear y usar la API.