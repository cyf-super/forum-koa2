/**
 * @description @at关系 service
 */

const { User, Blog, AtRelation } = require('../db/model/index')
const { formatBlog, formatUser } = require('./_format')

/**
 * 创建@关系
 *
 * @param {number} blogId
 * @param {number} userId
 * @returns
 */
async function createAtRelation(blogId, userId) {
  const result = await AtRelation.create({
    userId,
    blogId
  })

  return result.dataValues
}

/**
 * 获取@用户的博客数量（未读的）
 *
 * @param {*} userId
 * @returns
 */

async function getAtRelationCount(userId) {
  const result = await AtRelation.findAndCountAll({
    where: {
      userId,
      isRead: false
    }

  })
  console.log('result.count  ', userId, result.count)
  return result.count
}

/**
 * 获取@用户的博客列表
 *
 * @param {*} { userId, pageIndex, pageSize = 10 }
 * @returns
 */
async function getAtUserBlogList({ userId, pageIndex, pageSize = 10 }) {
  console.log(1111, userId, pageIndex, pageSize)
  const result = await Blog.findAndCountAll({
    limit: pageSize,
    offset: pageSize * pageIndex,
    order: [['id', 'desc']],
    include: [
      {
        model: AtRelation,
        attributes: ['userId', 'blogId'],
        where: { userId }
      },
      {
        model: User,
        attributes: ['userName', 'nickName', 'picture']
      }
    ]
  })

  // 格式化
  let blogList = result.rows.map(row => row.dataValues)
  blogList = formatBlog(blogList)
  blogList = blogList.map(blogItem => {
    blogItem.user = formatUser(blogItem.user.dataValues)
    return blogItem
  })

  console.log(2222, result.rows, blogList, result.count)

  return {
    count: result.count,
    blogList
  }
}

module.exports = {
  createAtRelation,
  getAtRelationCount,
  getAtUserBlogList
}
