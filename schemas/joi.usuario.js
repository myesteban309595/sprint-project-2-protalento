const Joi = require('joi');

const UsuarioSchema = Joi.object({

    usuario: Joi
        .string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    email: Joi
        .string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

    username: Joi
        .string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    password: Joi
        .string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    telefono: Joi.number(),

    direccion: Joi.string(),

    access_token: [
        
        Joi.string(),
        Joi.number()
    ],
})
    .xor('username', 'birth_year')
    .xor('password', 'access_token')

module.exports = UsuarioSchema;
