const Producto = require('../models/productos.models');
const RedisClient = require('../src/redis'); // '../redis.js'


// ************* OBTENER PRODUCTOS ********************* */

exports.GetProducts = async (req,res) => {

    const productos = await Producto.find();

    RedisClient.setex('Productos', 5 * 60, JSON.stringify(productos));
    res.json(productos);
}

// ************* CREAR PRODUCTOS ********************* */

exports.createProduct = async (req,res) => {

    const { productName, price } = req.body;

    if(productName && price) 
    {
        const ProductoExistente = await Producto.findOne({ productName });

        if (ProductoExistente)
        {
            res.status(404).json('producto ya existente ')

        } else {

            const NuevoProducto = new Producto ( { productName, price });

            NuevoProducto.save();

            RedisClient.del('Productos');
            res.json(NuevoProducto);
        }
    }else{

        res.status(404).json("producto no ingresado, verifica la solicitud")
    }
}

// ************* ACTUALIZAR PRODUCTOS ********************* */

exports.updateProduct = async (req,res) => {

    const {productName, price } = req.body;
    const { _id } = req.params;

    const ProductoExistente = await Producto.findById(_id);

    console.log(ProductoExistente);

    if(ProductoExistente)
    {
        ProductoExistente.productName = productName;
        ProductoExistente.price = price;

        ProductoExistente.save();

        console.log(ProductoExistente)

        RedisClient.del('Productos');
        res.json(ProductoExistente);

    } else {

        res.status(404).json('id No Encontrado')
    }
}

// ************* ALIMINAR PRODUCTOS ********************* */

exports.deleteProduct = async (req,res) => {

    RedisClient.del('Productos');

    try{

        const { _id } = req.params;
        const real = await Producto.findById(_id);

        console.log(real)

        if(real)
        {
            await Producto.deleteOne({ _id: _id });
            
            RedisClient.del('Productos');
            res.json('producto eliminado ');

        } else {

            res.status(400).json('id No Encontrado');
        }
    } catch(e){

        res.status(500).json(e)
    }
}
