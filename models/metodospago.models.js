
 const mongoose = require('mongoose');

 const metodosPagoSchema = new mongoose.Schema ({

    PaymentName : {

        type : String,
        require: true
    }
    
 });

 module.exports = mongoose.model('MetodosPago', metodosPagoSchema);