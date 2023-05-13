/**
 * @description 博客 @关系
 */

const { PAGE_SIZE } = require('../conf/constants')

/**
 * 获取 @ 我的博客数量
 *
 * @param {*} userId
 * @returns
 */

const { SuccessModel } = require('../model/ResModel')
const {
  getAtRelationCount,
  getAtUserBlogList,
  updateAtRelation
} = require('../services/at-relation')

async function getAtMeCount(userId) {
  const count = await getAtRelationCount(userId)
  return new SuccessModel({
    count
  })
}

/**
 * 获取@用户的微博列表
 *
 * @param {*} userId
 * @param {number} [pageIndex=0]
 * @returns
 */
async function getAtMeBlogList(userId, pageIndex = 0) {
  const result = await getAtUserBlogList({
    userId,
    pageIndex,
    pageSize: PAGE_SIZE
  })

  const { count, blogList } = result

  // 返回
  return new SuccessModel({
    isEmpty: blogList.length === 0,
    blogList,
    pageSize: PAGE_SIZE,
    pageIndex,
    count
  })
}

/**
 * 标记为已读
 *
 * @param {*} userId
 */
async function markAsRead(userId) {
  try {
    await updateAtRelation({ newIsRead: true }, { userId, isRead: false })
  } catch (error) {
    console.error(error)
  }
}

module.exports = {
  getAtMeCount,
  getAtMeBlogList,
  markAsRead
}
