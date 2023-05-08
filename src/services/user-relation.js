const { UserRelation, User } = require('../db/model/index')
const { formatUser } = require('./_format')

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
          followerId
        }
      }
    ]
  })

  // result.count 总数
  // result.rows 查询结果，数组

  let userList = result.rows.map(row => row.dataValues)
  userList = formatUser(userList)
  return {
    count: userList.count || 0,
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

module.exports = {
  getUsersByFollower,
  addFollower
}
