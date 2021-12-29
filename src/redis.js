const redis = require('redis');
const config = require('./config');

PORT_REDIS = config.module.PORT_REDIS;

const clienteRedis = redis.createClient(PORT_REDIS);

module.exports = clienteRedis;
