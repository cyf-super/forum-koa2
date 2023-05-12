/**
 * @description 首页 controller
 */
const xss = require('xss')
const { createBlog, getFollowersBlogList } = require('../services/blog')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { createBlogFailInfo } = require('../model/ErrorInfo')
const { PAGE_SIZE, REG_FOR_AT_WHO } = require('../conf/constants')
const { getUserInfo } = require('../services/user')
const { createAtRelation } = require('../services/at-relation')

/**
 * 创建博客
 */

async function create({ userId, image, content }) {
  // 分析并收集content中的@用户
  const atUserNameList = []

  // 不对content做任何处理，主要是拿到userName
  content = content.replace(
    REG_FOR_AT_WHO,
    (matchStr, nickName, userName) => {
      atUserNameList.push(userName)
      return matchStr
    }
  )

  // 根据 @ userName获取用户信息
  const atUserList = await Promise.all(atUserNameList.map(userName => getUserInfo(userName)))

  // 根据用户信息 获取用户id
  const atUserIdList = atUserList.map(user => user.id)

  try {
    const blog = await createBlog({
      userId,
      image,
      content: xss(content)
    })

    // 创建@关系
    await Promise.all(
      atUserIdList.map(userId => createAtRelation(blog.id, userId))
    )

    return new SuccessModel(blog)
  } catch (error) {
    console.log(error.message, error.stack)
    return new ErrorModel(createBlogFailInfo)
  }
}

/**
 * 获取首页博客列表
 *
 * @param {*} userId
 * @param {number} [pageIndex=0]
 * @returns
 */
async function getHomeBlogList(userId, pageIndex = 0) {
  const result = await getFollowersBlogList({
    userId,
    pageIndex,
    pageSize: PAGE_SIZE
  })

  const { count, blogList } = result

  return new SuccessModel({
    isEmpty: blogList.length === 0,
    blogList,
    pageSize: PAGE_SIZE,
    pageIndex,
    count
  })
}

module.exports = {
  create,
  getHomeBlogList
}
