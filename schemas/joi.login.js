const joi = require('joi');

const loginSchema = joi.object({

    username: joi
        .string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    password: joi.string()
    
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
})

module.exports = loginSchema;
