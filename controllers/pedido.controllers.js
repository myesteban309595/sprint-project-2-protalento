const {Orden} = require('../models/pedidos.models');
const Producto = require('../models/productos.models');
const MedioDePago = require('../models/metodospago.models');
const Usuario = require('../models/usuario.models');

// ********************** VERIFICAR ORDEN EXISTENTE ************************* */

exports.verificarOrdenes = async(req,res) => {

    const ordenActual = await Orden.findOne({ username:req.user.usernameU , state : 'pendiente'});

    if (ordenActual)
    {
        res.json(ordenActual)

    } else {

        res.json('No tienes ordenes pendientes')
    }
}

// ********************** OBTENER TODAS LAS ORDENES ************************* */

exports.obtenerTodasOrdenes = async(req,res) => {

    const ordenes = await Orden.find({ username: req.user.usernameU });
    console.log(ordenes)

    if (ordenes)
    {
        res.json(ordenes)

    } else {
        res.json('Por el momento no tienes ordenes creadas ')
    }
}

// ***************** AGREGAR PRODUCTO A ORDEN EXISTENTE *********************** */

exports.agregarProducto = async (req,res) => {

    const existeOrden = await Orden.findOne({ username: req.user.usernameU, state: 'pendiente' });

    try{

    const { _id } = req.params;
    const { product , price } = await Producto.findById(_id);

    const traerInfoProducto = (product, price, quantity) => {

        const productCost = quantity * price;
        return{ _id: _id, price, product, productCost, quantity};
     };

    if ( existeOrden && product)
    {
        const quantityProducts = existeOrden.products.id(_id);

        if(!quantityProducts) 
        {
            existeOrden.products.push(traerInfoProducto(product, price, 1));
            existeOrden.orderCost = existeOrden.ObtenerTotal();

            await existeOrden.save();
            res.json(existeOrden);

        }else

        {
        quantityProducts.quantity += 1;
        quantityProducts.productCost = quantityProducts.quantity * price;
        existeOrden.orderCost = existeOrden.ObtenerTotal();

        await existeOrden.save();
        res.json(existeOrden);

        }
       }else {

           res.status(400).json(' id no encontrado')
       }

   } catch(e) {

       console.log(e);
   }
}

// ********************** ELIMINAR PRODUCTO DE ORDEN  ************************* */

exports.eliminarProducto = async (req,res) => {

    try {

        const existeOrden = await Orden.findOne({ username: req.user.usernameU, state:'pendiente' });

        if(existeOrden)
        {
                const productoRemover = existeOrden.products.id(req.params._id);

                if(productoRemover.quantity > 1)
                {
                    productoRemover.quantity = productoRemover.quantity -1;
                    productoRemover.productCost = productoRemover.quantity * productoRemover.price;

                }else{

                    productoRemover.remove();
                }

                existeOrden.orderCost = existeOrden.ObtenerTotal();
                await existeOrden.save();
                res.json('producto Eliminado')

            } else {

                res.status(404).json('id no encontrado')
            }
        }
    catch (e){

        console.log(`id del producto no encontrado:  ${e}`)
    }
}

// ********************** ACTUALIZAR METODO PAGO ************************* */

exports.actualizarMetodoPago = async (req,res) => {

try{

    const { _id } = req.params;
    const existeOrden = await Orden.findOne ({ username: req.user.usernameU , state :'pendiente'})
    const existeMedioDePago = await MedioDePago.findById(_id);

    if(existeMedioDePago && existeOrden.state == "pendiente")
    {

     existeOrden.medioDePago = existeMedioDePago.medioDePago;
     existeOrden.save();
     res.json('el medio de pago se ha actualizado');

    }else{

    res.status(404).json("uPPS ¡ Creo que el medio de pago no existe, por favor verifica nuevamente e intentalo de nuevo");
}
}catch(e){

    res.json(`se ha presentado un error:  ${e}`)
}

}

// ********************** ACTUALIZAR DIRECCION   ************************* */

exports.actualizarDireccion = async (req, res) => {

    const { _id } = req.params;
    const { direccion } = req.body;
    const cambioDireccion = await Orden.findById(_id);

    if(cambioDireccion && cambioDireccion.state == 'pendiente')
    {
        cambioDireccion.direccion = direccion;
        cambioDireccion.save();
        res.json('direccion actualizada');

    } else {

        res.status(400).json(' la orden solo puede ser modificada en estado pendiente, por favor verifica el estado o el id. ')
    }
}

// ********************** AGREGAR DIRECCION   ************************* */

exports.agregarDireccion = async (req,res) => {

    try{

        const user = await Usuario.findOne({ username: req.user.usernameU });
        const direccionActualizada = user.direcciones.id(req.params._id);

        console.log(direccionActualizada);

        const cambioDireccion = await Orden.findOne({ username: req.user.usernameU, state: 'pendiente'});

        if (cambioDireccion)
        {
            cambioDireccion.direccion = direccionActualizada.direccion;
            cambioDireccion.save();
            res.json(cambioDireccion);

        } else{

            res.json('orden no ubicada');
        }
    } catch(e){

        console.log(e);
        res.status(404).json(e);
    }
}

// ********************** CONFRMAR ORDEN  ************************* */

exports.cofirmarOrden = async (req,res) => {

    const { _id } = req.params;
    const { state } = req.body;
    const confirmarPedido = await Orden.findById(_id);

    if (confirmarPedido && state == 'confirmado' && confirmarPedido.state == 'pendiente')
    {
        confirmarPedido.state = state;
        confirmarPedido.save();
        res.json('Orden confirmada')

    } else {

        res.status(400).json(' por favor verifica el id o envia un confirmado a la orden (pendiente => confirmado)')
    }
}

// ************************** CREAR ORDEN  *************************** */

exports.crearOrden = async (req,res) => {

    const { direccion } = req.body;
    const { username } = await Usuario.findOne({ username: req.user.usernameU });
    const existeOrden = await Orden.findOne({ username : req.user.usernameU , state : "pendiente"});

    if (existeOrden)
    {
        res.status(400).json('no puede puedes tener mas de una orden pendiente');

    } else {

        const nuevaOrden = new Orden ({ username , direccion});
        nuevaOrden.save();
        res.json(`orden creada, por favor ingnresa tu seleccion de productos`)
    }
}

// ****************** ACTUALIZAR ESTADO DE LA ORDEN ********************* */

exports.actualizarEstadoOrden = async (req,res) => {

    const { _id } = req.params;
    const { state } = req.body;

    if ( state == 'pendiente' || state == 'confirmado' || state == 'en preparacion' || state == 'enviado' || state == 'entregado' ) 
    {
        confirmarOrden = await Orden.findById(_id);

        if(confirmarOrden)
        {
            confirmarOrden.state = state;
            confirmarOrden.save();
            res.json('estado actualizado')

        } else {

            res.json('id no encontrado')
        }
    } else {
        
        res.json( " estados de la orden :  'pendiente', 'confirmado', 'en preparacion', 'enviado', 'entregado', verifica el estado nuevamente ")
    }
}

// ********************** OBTENER ORDENES ************************* */


exports.obtenerOrdenes = async (req, res) => {

    const ordenes = await Orden.find();
    res.json(ordenes);
}
