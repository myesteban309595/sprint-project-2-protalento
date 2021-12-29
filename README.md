
# Sprint project 2 PROTALENTO (Api restaurant delilah restó)


El fin de este proyecto, es la administracion, gestion y control de un restaurante dedicado a la venta de alimentos, en el podemos realizar operaciones CRUD, las que me permiten agregar, actualizar, obtener o eliminar productos, bien sea desde el ambiente administrador, o como cliente. Como administradores de la plataforma podemos obtener las ordenes y pedidos de nuestros clientes, conocer su informacion y los productos de su interés, tambien los clientes pueden visualizar el menú completo y hacer peticiones de los productos a su gusto dandole la flexibilidad de guardar varias direcciones de envio, medios de pago y cantidad de productos, cabe resaltar que los clientes solo pueden tener un pedido activo a la vez, y tambien pueden realizar operaciones CRUD sobre sus pedidos antes de que este sea finalizado, una vez finalizado se bloquearán estas operaciones.

## Proceso de instalacion

 descarga el respositorio en el siguiente link[repositorio GITHUB]( ), una vez descargado instala los paquetes necesarios y se implemetó con una base de datos trabajada desde mongoose, por consiguiente debes cumplir los siguientes requerimientos:

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

2.  go the next link for begin to interact, swagger [documentacion](http://localhost:3000/swaggerAPI/)

3. El username del administrador es tiago y el password es 4irSjZNZ, con este usuario tienes acceso a todas las rutas de la  API, si quieres puedes ingresar con un usuario que ya esta en la base de datos, el username es evel and his password 5aJX9uZQn o puedes crear una cuenta propia. (al crear la cuenta debes ir a la ruta cuenta/login, al ingresar el username y contraseña te saldra como respuesta un token el cual al momento de ponerlo en el authorize the va a dar acceso a las rutas de la API).
### Routes availables for the user
4. En la ruta POST/cuenta/crearCuenta podras crear una nueva cuenta. poniendo en el body toda la informacion requerida como se muestra a continuacion:

```javascript
{
  "usuario": "Emiliano",
  "email": "emi@gmail.com",
  "username": "emi",
  "password": "1012",
  "telefono": 3217780943,
  "direccion": "avenida candeleo. calle 21 casa 33"
}
```
 en la parte de responses body, debe aparecer cuenta creada.

5. Para verificar debes ir a la ruta POST/cuenta/login loguearte con el username y el password del usuario creado. Poniendo en el body el username y password como se muestra a continuación:

```javascript
{
  "username": "emi",
  "password": "1012"
}
```

y en la parte de responses body debe aparecer "bienvenido emi tu token es aswqwewi129234..... y tu id es 4532..... "

nota : en este momento debes en el authorize ingresar el token adquirido.

6. Ahora debes ir a la ruta POST/pedidos/crearPedido, teniendo en el autorize el token se creara una orden lista para agregar los productos que quieras llevar en tu pedido, en el response body te debe aparece "orden creada, ya puedes empezar a ingresar productos":

luego en la ruta GET/pedidos/verPedido te debe aparecer al muy similar a la siguiente orden vacia:

```javascript
{
  "orderCost": 0,
  "medioDePago": "efectivo",
  "state": "pendiente"
  "_id": "6130e5b2accb5229308078bf",
  "username": "emi",
  "direccion": "avenida candeleo. calle 21 casa 33",
  "products": [],
  "__v":0
}
```
7. En la ruta GET/productos puedes ver todos los productos disponibles para la venta y verificar el id de cada uno.

8. En la ruta POST/pedidos/producto/{id} vas a poder agregar un producto a tu pedido por medio del id del producto. Debes poner el id del producto deseado en la casilla habilitada en el interior de la ruta, darle execute, al agregarlo te apareceria algo como esto:


```javascript
{
  "orderCost": 11000,
  "medioDePago":"efectivo",
    "state": "pendiente"
  "_id": "6130e5b2accb5229308078bf",
  "username": "emi",
  "direccion": "av. 43 calle 12 casa 3",
  "products": [
    {
      "quantity":1,
      "_id": "6130e5b2accb5229308078bf",
      "precio": 11000,
      "nombreProducto": "hamburguesa triple queso",
      "productCost": 11000
    }
  ],
  "__v": 0
}
```

puedes agregar cuantos desees y podras ver en orderCost el valor que deberas pagar por el pedido de los productos seleccionados y  en el atributo quantity podras ver la cantidad de productos que llevas de la misma referencia.

9. En la ruta DELETE/pedidos/producto/{id} puedes eliminar cualquier producto de los seleccionados anteriormente, ingresa su id en la casilla habilitada en el interior de la ruta, al eliminarlo el costo del pedido debe ser igual a la sumatoria del costo de los productos que queden en el pedido.

10. En la ruta GET/mediosDePago vas a poder observar los medios de pago disponibles con su corresponiente id.

11. En la ruta PUT/pedidos/medioDePago vas a poder especificar el medio de pago que quieres usar para pagar el pedido que estas solicitando. Por defecto te aparece efectivo.
Por la casilla habilitada para ingresar el id que corresponde al medio de pago que quieres utilizar.

12. En la ruta PUT/pedidos/cambioDireccion/{id} podras agregar la direccion a la que quieres que llegue tu pedido, debes poner el id de la orden a la que quieres cambiarle la direccion (el ahi lo puedes ver en la ruta ver en GET/pedidos/verPedido y por el body vas a ingresar la nueva direccion de la siguente manera:

```javascript
{
  "direccion": "direccion actualizada"
}
```

y en el responses debe aparecer direccion actualizada.

12.1 En la ruta POST/users/nuevaDireccion puedes agregar las direcciones que quieras  enviandolas una por una por el body.

```javascript
{
  "direccion": "direccion a guardar"
}
```

y en el response body te debe aparecer todas las direcciones junto a la que acabas de guardar al igual que en la ruta GET/users/verDirecciones.

12.2 En la ruta PUT/users/actualizarDireccion/{id} puedes por medio del id actualizar la direccion que desees y poniendo por el body la direccion actualizada y te va a aparecer todos los datos de tu usuario con la direccion actualizada.

12.3 En la ruta  DELETE/users/eliminarDireccion/{id} podras por medio del id eliminar cualquiera de las direcciones que tengas guardadas.

12.4 Para enviar alguna de estas direcciones guardadas a tu pedido pendiente vas a la ruta PUT/pedidos/direccionGuardada/{id} y con el id de la direccion que quieres agregar a tu pedido podras empalmarla a tu pedido pendiente.

13. En la ruta PUT/pedidos/confirmarPedido/{id} vas a cambiar el estado del pedido que estas modificando de pendiente a confirmado, para cerrar la orden y que pueda empezar el alistamiento del mismo, por el body debes ingresar el estado de la siguiente manera:

```javascript
{
  "state": "confirmado"
}
```

y por medio de la casilla habilitada dentro de la ruta poner el id del pedido al cual se le quiere modificar el estado (este id lo puedes ver en las rutas mencionadas en los numerales 12, 11, 9 y 8 en los cuales modificadas el pedido, en el responses aparece el pedido completo con su respectivo id).

14. En la ruta GET/pedidos/verHistorialPedidos vas a poder ver el pedido que acabas de confirmar y deberas ir a la ruta mencionada en el numeral 6 para crear una nueva orden.

15. En la ruta PUT/users/{id} se podra modificar el usuario creado. se debe ingresar en la casilla habilitada dentro de la ruta el id del usuario a editar (este lo puedes verificar en el numeral 5 en el response aparece el username y el id que le corresponde al usuario), y en el body poner los datos que se desean modificar. ( recuerda que debes estar logueado con username y password en el autorize para ejecutar esta accion).

### Rutas habilitadas para el Administrador (debes usar el usuario y contraseña en el autorize mencionado en el numeral 3).

17. En la ruta POST/mediosDePago puedes agregar un medio de pago enviandolo por el body de la siguiente manera.

```javascript
{
  "medioDePago": "nuevo medio de pago"
}
```

y en responses van a aparecer todos los medios de pago incluyendo el recien ingresado.

18. En la ruta DELETE/mediosDePago ingresando el id por la casilla habilitada eliminaras el medio de pago correspondiente a el id ingresado. (recuerda que debes loguearte como administrador y poner el token en el authorize los datos del administrador estan en el numeral 3).

19. En la ruta PUT/nuevoMediosDePago/{id} puedes actualizar los medios de pago existentes, en la casilla habilitada debes poner el id del medio de pago que deseas editar, y por el body enviar el medio de pago que quieres ingresar de la siguiente manera :

```javascript
{
  "medioDePago": "nuevo medio de pago"
}
```

20. En la ruta PUT/pedidos/cambiarEstadoPedido/{id} se puede cambiar el estado de las ordenes creadas, se debe enviar el id en la casilla habilitada del pedido que se quiere modificar, y en el body enviar el estado que se desea poner. (lo estados habilitados para el administrador son:pendiente, confirmado, en preparacion, enviado, entregado), a continuacion un ejemplo de lo que deberia ir en el body:

```javascript
{
  "state": "en preparacion"
}
```
y en el response aparecera "estado actualizado".

21. En la ruta GET/pedidos se obtienen todas los pedidos en la aplicacion.

22. En la ruta POST/productos podras agregar un nuevo producto para la venta, debes ingresar por el body el nombre y el precio del producto de la siguiente manera:

```javascript
{
  "nombreProducto": "pinapple dessert",
  "precio": 5000
}
```
y en el responses debe aparecer el producto creado con su respectivo id y cantidad "quantity" de la siguiente manera:

```javascript
{
  "id_": "6130fc5030688b223095af8d",
  "nombreProducto": "pinapple dessert",
  "precio": 5000,
}
```
22. En la ruta PUT/productos/{id} podras modificar productos ya creados, ingresando en la casilla habilitada el id del producto que quieres editar y en el body su nuevo nombre y precio de la siguiente manera:

```javascript
{
  "nombreProducto": "crostty burguer",
  "precio": 12000
}
```
en el responses te debe aparecer el producto con la informacion actualizada, si vas a la ruta GET/productos y le das execute vas a ver todos los productos incluyendo el actualizado.

23. En la ruta DELETE/productos/{id} puedes eliminar los productos habilitados para la venta, debes ingresar el id del producto que quieres eliminar en la casilla habilitada y en el responses apareceran todos los productos excepto el que acabas de eliminar, estos productos se veran reflejados en unos cuantos minutos en la ruta mencionada en el numeral 7 por el tema del redis y el uso del cache.

24. En la ruta DELETE/users/{id} podras eliminar los usuarios existentes, debes ingresar el id en la casilla habilitada del usuario que quieres eliminar y en el responses deben aparecer todos los usuarios excepto el que acabas de eliminar.

25. En la ruta  GET/users puedes obtener todos los usuarios con una cuenta habilitada en la aplicacion.

26. en la ruta PUT/cambiarEstado/{id} podras cambiar el estado del usuario de "activo" a "suspendido" para evitar que este se pueda loguear y usar la API.