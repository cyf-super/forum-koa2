/**
 *
 */

const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/loginChecks')
const { getProfileBlogList } = require('../../controller/blog-profile')
const { isExist } = require('../../controller/user')

// 首页
router.get('/', loginRedirect, async (ctx, next) => {
  await ctx.render('index', {})
})

// 个人主页
router.get('/profile', loginRedirect, async (ctx, next) => {
  const { userName } = ctx.session.userInfo
  const url = `/profile/${userName}`
  await ctx.redirect(url)
})

router.get('/profile/:userName', loginRedirect, async (ctx, next) => {
  const hasLoginUserInfo = ctx.session.userInfo
  const { userName: curUserName } = ctx.params
  const isMe = curUserName === hasLoginUserInfo.userName
  let curUserInfo = {}

  if (isMe) {
    // 是当前登录用户
    curUserInfo = hasLoginUserInfo
  } else {
    // 不是当前登录用户
    const existRes = await isExist(curUserName)
    if (existRes.errno !== 0) {
      // 用户名不存在
      return
    }
    // 用户名存在
    curUserInfo = existRes.data
  }

  // 获取第一个数据
  const result = await getProfileBlogList(curUserName, 0)
  const {
    isEmpty,
    blogList,
    pageSize,
    pageIndex,
    count
  } = result.data

  await ctx.render('profile', {
    blogData: {
      isEmpty,
      blogList,
      pageSize,
      pageIndex,
      count
    },
    userData: {
      userInfo: curUserInfo,
      isMe
    }
  })
})

module.exports = router
