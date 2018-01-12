const Redis = require('ioredis')
const config = require('config')

module.exports = new Redis(config.get('redisPort'), config.get('redisHost'))
