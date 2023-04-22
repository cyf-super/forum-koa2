/**
 * @description user services
 */

const User = require('../db/model/User')
const { formatUser } = require('./_format')

/**
 * 获取用户信息
 * @param {string} usrename
 * @param {string} password
 */
async function getUserInfo(username, password) {
  // 查询条件
  const whereOpt = {
    username
  }

  if (password) {
    Object.assign(whereOpt, { password })
  }

  const result = await User.findOne({
    attributes: ['id', 'userName', 'nickName', 'picture', 'city'],
    where: whereOpt
  })

  if (result === null) {
    return result
  }

  return formatUser(result.dataValues)
}

module.exports = {
  getUserInfo
}
