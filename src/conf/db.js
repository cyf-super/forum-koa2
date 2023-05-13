/**
 * @description 存储配置
 */

const { isProd } = require('../utils/env')

let REDIS_CONF = {
  host: '127.0.0.1',
  port: 6379
}

let MYSQL_CONF = {
  host: 'localhost',
  user: '数据库名称',
  password: '数据库密码',
  pord: '3306',
  database: 'koa2_weibo_db'
}

if (isProd) {
  REDIS_CONF = {
    host: '127.0.0.1',
    port: 6379
  }

  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'cyf1998',
    pord: '3306',
    database: 'koa2_weibo_db'
  }
}

module.exports = {
  REDIS_CONF,
  MYSQL_CONF
}
