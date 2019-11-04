const redis = require('redis')
const { REDIS_CONF } = require('../conf/db')

// 创建客户端
const redisClent = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)
redisClent.on_connect('error', err=>{
    console.error(err)
})

module.exports = redisClent