 
 const mongoose = require('mongoose');

 const productoSchema = new mongoose.Schema ({

    productName : {

        type : String,
        require: true
    },
    price: {

        type : Number,
        require: true
    },

 });

 module.exports = mongoose.model('Producto', productoSchema);