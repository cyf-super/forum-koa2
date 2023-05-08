/**
 * 用户关系
 */
const {
  getUsersByFollower,
  addFollower,
  deleteFollower,
  getFollowersByUser
} = require('../services/user-relation')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const {
  addFollowerFailInfo,
  deleteFollowerFailInfo
} = require('../model/ErrorInfo')

/**
 * 根据userid获取粉丝列表
 * @param {*} userId 用户id
 */
async function getFans(userId) {
  const { count, userList } = await getUsersByFollower(userId)
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

/**
 * 取消关注
 * @param {number} myUserId 当前登录的用户id
 * @param {number} curUserId 要被关注的用户id
 */
async function unfollow(myUserId, curUserId) {
  const result = await deleteFollower(myUserId, curUserId)
  if (result) {
    return new SuccessModel()
  }
  return new ErrorModel(deleteFollowerFailInfo)
}

/**
 * 获取关注人列表
 * @param {number} userId
 */
async function getFollower(userId) {
  const { count, userList } = await getFollowersByUser(userId)
  return new SuccessModel({
    count,
    followersList: userList
  })
}
module.exports = {
  getFans,
  follow,
  unfollow,
  getFollower
}
