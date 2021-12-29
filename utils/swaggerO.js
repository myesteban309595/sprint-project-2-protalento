const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Sprint project 2 - Acamica / Protalento",
            version: "1.0.0",
            description: "mi API persistente",
            contact : {
                name : " Marlon Yoel Esteban Valencia",
                email : "maryoe_95@hotmail.com"
            }
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Servidor de prueba"
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        },
        security: [
            {
                bearerAuth: []
            }
        ]
    },
    apis: ["./src/routes/*.js"]
};

module.exports = swaggerOptions;
