/**
 * @description 连接redis
 */

const redis = require('redis')
const { REDIS_CONF } = require('../conf/db')

const redisCient = redis.createClient({
  host: REDIS_CONF.host,
  port: REDIS_CONF.port
})

redisCient.on('connect', () => {
  console.log('Redis client connected')
})

redisCient.on('error', err => {
  console.log('redis error ', err)
})

async function start() {
  console.log('redisCient.connected ', redisCient.connected)
  if (!redisCient.connected) {
    await redisCient.connect()
  }
  return {
    get: function (key) {
      return new Promise((resolve, reject) => {
        redisCient.get(key, async (err, val) => {
          console.log('err, val==> ', err, val)
          if (err) {
            reject(err)
          }
          if (val === null) {
            resolve(val)
          }

          try {
            resolve(JSON.parse(val))
            await redisCient.disconnect()
          } catch (e) {
            resolve(val)
          }
        })
      })
    }
  }
}

/**
 * @param {string} key
 * @param {string} val
 * @param {number} timeout
 */
function set(key, val, timeout = 60 * 60) {
  if (typeof val === 'object') {
    val = JSON.stringify(val)
  }
  redisCient.set(key, val)
  redisCient.expire(val, timeout)
}

/**
 * @param {string} key
*/
// const { get } = start()
module.exports = {
  start,
  set,
  redisCient
}
