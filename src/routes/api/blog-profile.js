/**
 * 个人主页
 */

const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/loginChecks')
const { getProfileBlogList } = require('../../controller/blog-profile')
const { getBlogListStr } = require('../../utils/blog')
const { follow } = require('../../controller/user-relation')

router.prefix('/api/profile')

// 加载更多
router.get('/loadMore/:userName/:pageIndex', loginCheck, async (ctx) => {
  const { userName, pageIndex } = ctx.params
  const result = await getProfileBlogList(userName, parseInt(pageIndex))

  // 渲染为html字符串
  result.data.blogListTpl = getBlogListStr(result.data.blogList)
  ctx.body = result
})

// 关注
router.post('/follow', async (ctx, next) => {
  const { id: myUserId } = ctx.session.userInfo
  const { userId: curUserId } = ctx.request.body

  ctx.body = await follow(myUserId, curUserId)
})

module.exports = router
