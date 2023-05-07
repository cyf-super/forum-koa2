/**
 * @description 首页 controller
 */

const { createBlog } = require('../services/blog')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { createBlogFailInfo } = require('../model/ErrorInfo')

/**
 * 创建博客
 */

async function create({ userId, image, content }) {
  try {
    const blog = await createBlog({ userId, image, content })
    return new SuccessModel(blog)
  } catch (error) {
    console.log(error.message, error.stack)
    return new ErrorModel(createBlogFailInfo)
  }
}

module.exports = {
  create
}
