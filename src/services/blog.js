/**
 * 博客
 */

const { Blog, User } = require('../db/model/index')
const { formatUser } = require('./_format')

/**
 * 创建博客
 */
async function createBlog({ userId, content, image }) {
  const result = await Blog.create({
    userId,
    content,
    image
  })
  return result.dataValues
}

/**
 * 获取用户博客 列表
 */
async function getBlogListByUser({ userName, pageIndex = 0, pageSize = 10 }) {
  const userWhereOpt = {}
  if (userName) {
    userWhereOpt.username = userName
  }

  // 执行查询
  const result = await Blog.findAndCountAll({
    limit: pageSize, // 每页多少条
    offset: pageSize * pageIndex, // 跳过多少条
    order: [
      ['id', 'desc']
    ],
    // 顺便查询该用户数据
    include: [
      {
        model: User,
        attribute: ['userName', 'nickName', 'picture'],
        where: userWhereOpt
      }
    ]
  })

  let blogList = result.rows.map(row => row.dataValues)

  blogList = blogList.map(blogItem => {
    const user = blogItem.user.dataValues
    blogItem.user = formatUser(user)
    return blogItem
  })

  return {
    blogList,
    count: result.count
  }
}

module.exports = {
  createBlog,
  getBlogListByUser
}
