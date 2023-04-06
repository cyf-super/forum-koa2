/**
 * @description 创建Sequelize实例
 */

const Sequelize = require('sequelize')
const { MYSQL_CONF } = require('../conf/db')
const { isProd, isTest } = require('../utils/env')

const { host, user, password, database } = MYSQL_CONF

const config = {
  host,
  dialect: 'mysql' // 数据库类型
}

if (isTest) {
  config.logging = () => { }
}

if (isProd) {
  config.pool = {
    max: 5,
    min: 0,
    idle: 10000
  }
}

// 数据库名称、账号、密码
const seq = new Sequelize(database, user, password, config)

module.exports = seq
