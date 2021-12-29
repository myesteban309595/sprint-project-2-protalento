const { config } = require('dotenv');

config();

exports.module = {

    PORT: process.env.PORT || 3000,
    MONGOOSE_URL: process.env.MONGOOSE_URL,
    PASSWORDUSER1: process.env.PASSWORDUSER1,
    PASSWORDUSER2: process.env.PASSWORDUSER2,
    ACCESO: process.env.ACCESO,

}
