
 const mongoose = require('mongoose');

 // modelo para el producto del pedido

 const productoSchema = new mongoose.Schema ({

    product : {

        type : String,
        require: true
    },
    price: {

        type : Number,
        require: true
    },
    quantity: 
    {
        type : Number,
        require: true
    },
    productcost: {

        type : Number,
        require: true
    },

    _id:{
        type: mongoose.ObjectId,
        required: true,
    }
    
 });

 // modelo para el usuario y los productos pedidos 

 const UsuarioPedidosSchema = mongoose.Schema({

    userData: { type: mongoose.Schema.Types.ObjectId, ref: "User"},

    ordencost: {

        type: Number,
        default:0

    },

    username: {

        type: String,
        required: true
    },
    addres: {
        type: String,
        required:true
    },

    products: [productoSchema],

    paymentmethod: {

        type: String,
        default: "efectivo"
    },

    orderState: {   // este es el estado de la orden

        type: String,
        default :"pendiente"
        
    }


 });

 // **********************         operaciones del modelo         *************************

 // obtener el total del pedido

 UsuarioPedidosSchema.methods.ObtenerTotal = function () 
 {
    return this.products.reduce( (acum, currentValue) => acum + currentValue.productcost, 0);
 }

 // editar la cantidad de un producto

const editProduct = (products, ordenExistente) => 
{

    products.forEach(prod => {

        const editarProducto = ordenExistente.products.id(prod.id);   //busco el producto a editar por su id

        editarProducto.quantity = prod.quantity; // extraigo la cantidad del producto
        editarProducto.orderCost = (editarProducto.quantity) * (editarProducto.precio)
        
    });

    ordenExistente.orderCost = ordenExistente.ObtenerTotal();

}

const Orden = mongoose.model('Orden', UsuarioPedidosSchema); 

module.exports = { Orden, editProduct}
