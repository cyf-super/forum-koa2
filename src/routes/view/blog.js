/**
 * 博客
 */

const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/loginChecks')
const { getProfileBlogList } = require('../../controller/blog-profile')
const { getSquareBlogList } = require('../../controller/blog-square')
const { getFans, getFollower } = require('../../controller/user-relation')
const { isExist } = require('../../controller/user')
const { getHomeBlogList } = require('../../controller/blog-home')

// 首页
router.get('/', loginRedirect, async (ctx, next) => {
  const userInfo = ctx.session.userInfo
  const { id: userId } = userInfo

  // 获取第一页数据
  const result = await getHomeBlogList(userId)
  const { isEmpty, blogList, pageSize, pageIndex, count } = result.data
  console.log('result.data ', result.data)

  // 获取粉丝
  const fansResult = await getFans(userId)
  const { count: fansCount, userList } = fansResult.data

  // 获取关注人列表
  const followersResult = await getFollower(userId)
  const { count: followersCount, followersList } = followersResult.data
  await ctx.render('index', {
    userData: {
      userInfo,
      fansData: {
        count: fansCount,
        list: userList
      },
      followersData: {
        count: followersCount,
        list: followersList
      }
    },
    blogData: {
      isEmpty,
      blogList,
      pageSize,
      pageIndex,
      count
    }
  })
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

  // 获取粉丝
  const fansResult = await getFans(curUserInfo.id)
  const { count: fansCount, userList } = fansResult.data

  // 判断关注状态
  const amIFollowed = userList.some(item => {
    return item.userName === hasLoginUserInfo.userName
  })

  // 获取关注人列表
  const followersResult = await getFollower(curUserInfo.id)
  const { count: followersCount, followersList } = followersResult.data

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
      isMe,
      fansData: {
        count: fansCount,
        list: userList
      },
      followersData: {
        count: followersCount,
        list: followersList
      },
      amIFollowed
    }
  })
})

// 广场
router.get('/square', loginRedirect, async (ctx) => {
  const result = await getSquareBlogList(0)
  const { isEmpty, blogList, pageSize, pageIndex, count } = result.data || {}
  await ctx.render('square', {
    blogData: {
      isEmpty,
      blogList,
      pageSize,
      pageIndex,
      count
    }
  })
})

module.exports = router
