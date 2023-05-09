const { UserRelation, User } = require('../db/model/index')
const { formatUser } = require('./_format')
const sequelize = require('sequelize')

/**
 * 根据用户id获取粉丝列表
 * @param {string} followerId 用户id
 */
async function getUsersByFollower(followerId) {
  const result = await User.findAndCountAll({
    attributes: ['id', 'userName', 'nickName', 'picture'],
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: UserRelation,
        where: {
          followerId,
          userId: {
            [sequelize.Op.ne]: followerId
          }
        }
      }
    ]
  })

  // result.count 总数
  // result.rows 查询结果，数组

  let userList = result.rows.map(row => row.dataValues)
  userList = formatUser(userList)
  return {
    count: result.count,
    userList
  }
}

/**
 * 添加关注关系
 * @param {number} userId 用户id
 * @param {number} followerId 被关注用户 id
 */
async function addFollower(userId, followerId) {
  const result = await UserRelation.create({
    userId,
    followerId
  })

  return result.dataValues
}

/**
 * 取消关注关系
 * @param {number} userId 用户id
 * @param {number} followerId 被关注用户 id
 */
async function deleteFollower(userId, followerId) {
  const result = await UserRelation.destroy({
    where: {
      userId,
      followerId
    }
  })

  return result > 0
}

/**
 * 获取关注人列表
 *
 * @param {number} userId
 * @returns
 */
async function getFollowersByUser(userId) {
  const result = await UserRelation.findAndCountAll({
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: User,
        attributes: ['id', 'userName', 'nickName', 'picture']
      }
    ],
    where: {
      userId,
      followerId: {
        [sequelize.Op.ne]: userId
      }
    }
  })

  // result.count 总数
  // result.rows 查询结果，数组
  let userList = result.rows.map(row => row.dataValues)
  userList = userList.map(item => {
    let user = item.user
    user = user.dataValues
    user = formatUser(user)
    return user
  })

  console.log('result==> ', result.count, userList, result)
  return {
    count: result.count,
    userList
  }
}

module.exports = {
  getUsersByFollower,
  addFollower,
  deleteFollower,
  getFollowersByUser
}
