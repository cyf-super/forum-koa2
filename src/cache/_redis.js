/**
 * @description 连接redis
 */

const redis = require('redis')
const { REDIS_CONF } = require('../conf/db')

const redisCient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)

redisCient.on('error', err => {
  console.log('redis error ', err)
})

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
function get(key) {
  return new Promise((resolve, reject) => {
    redisCient.get(key, (err, val) => {
      if (err) {
        reject(err)
      }
      if (val === null) {
        resolve(val)
      }

      try {
        resolve(JSON.parse(val))
      } catch (e) {
        resolve(val)
      }
    })
  })
}

module.exports = {
  get,
  set
}
