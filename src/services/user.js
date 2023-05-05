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

async function createUser({ username, password, gender = 3, nickname }) {
  const res = await User.create({
    username,
    password,
    gender,
    nickname: nickname || username
  })
  return res.dataValues
}

/**
 * 更新用户信息
 * @param {*} param0 修改内容 { newPassword, newNickName, newCity, newPicture }
 * @param {*} param1 修改的对象 { username, password }
 */
async function updateUser(
  { newPassword, newNickName, newCity, newPicture },
  { username, password }
) {
  // 拼接修改内容
  const updateData = {}
  if (newPassword) {
    updateData.password = newPassword
  }
  if (newNickName) {
    updateData.nickname = newNickName
  }
  if (newCity) {
    updateData.city = newCity
  }
  if (newPicture) {
    updateData.picture = newPicture
  }

  // 拼接修改条件
  const whereData = {
    username
  }
  if (password) {
    whereData.password = password
  }

  // 执行更新
  const result = await User.update(updateData, {
    where: whereData
  })
  return result[0] > 0 // 修改的行数
}

module.exports = {
  getUserInfo,
  createUser,
  updateUser
}
