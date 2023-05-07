/**
 * 博客
 */

const { Blog } = require('../db/model/index')

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

module.exports = {
  createBlog
}
