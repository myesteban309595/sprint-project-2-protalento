const MedioDePago = require('../models/metodospago.models')

// ************ OBTENER METODOS DE PAGO ****************** */

exports.getPaymentMethods = async (req,res) => {

    const getPayments = await MedioDePago.find();
    res.json(getPayments);

}

// *************** CREAR METODO DE PAGO ****************** */

exports.createPaymentMethod = async ( req, res) => {

    const { PaymentName } = req.body;
    const existeMedioDePago = await MedioDePago.findOne({ PaymentName });

    if(existeMedioDePago){

        res.json(" Ya existe el metodo de pago  ")

    }else{

        const nuevoMedioDePago = new MedioDePago ( { PaymentName });
        nuevoMedioDePago.save()

        res.status(404).json(nuevoMedioDePago);

    }
}

// ************ ACTUALIZAR METODO DE PAGO ****************** */

exports.updatePaymentMethod = async (req, res ) => {

    try {

        const { _id } = req.params;
        const { PaymentName } = req.body;
        const existeMedioDePago = await MedioDePago.findById(_id);

        if(existeMedioDePago)
        {

        existeMedioDePago.medioDePago = medioDePago;
        existeMedioDePago.save();
        res.json(existeMedioDePago)

        }else{

        res.status(404).json('metodo de pago no encontrado, por favor verique el id')

        }
    } catch (e) {

        console.log(`No ha sido posible ejecutar la solicitud :( ${e}`)
    }
}

// **************** BORRAR METODO DE PAGO ****************** */

exports.deletePaymentMethod = async ( req, res) => {

    try{

        const { _id } = req.params;
        const existeMedioDePago = await MedioDePago.findById(_id);

        if (existeMedioDePago)
        {

        await MedioDePago.deleteOne({_id:req.params});
        res.json("medio de pago eliminado :D");

        } else {

        res.status(400).json(' metodo de pago no encontrado, por favor verique el id');

        };
    }catch (e){

        console.log(`se ha presentado el siguiente error: ${e}`)
    }
}
