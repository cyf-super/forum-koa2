/**
 * 用户关系
 */
const {
  getUsersByFollower,
  addFollower
} = require('../services/user-relation')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const {
  addFollowerFailInfo
} = require('../model/ErrorInfo')

/**
 * 根据userid获取粉丝列表
 * @param {*} userId 用户id
 */
async function getFans(userId) {
  const { count, userList } = await getUsersByFollower(userId)
  console.log('count-- ', count, userList)

  return new SuccessModel({
    count,
    userList
  })
}

/**
 * 关注
 * @param {number} myUserId 当前登录的用户id
 * @param {number} curUserId 要被关注的用户id
 */
async function follow(myUserId, curUserId) {
  try {
    await addFollower(myUserId, curUserId)
    return new SuccessModel()
  } catch (e) {
    return new ErrorModel(addFollowerFailInfo)
  }
}

module.exports = {
  getFans,
  follow
}
