/**
 * @description user view 路由
 */

const router = require('koa-router')()

async function getUserInfo(ctx) {
  let data = {
    isLogin: false
  }

  const userInfo = ctx.session.userInfo
  if (userInfo) {
    data = {
      isLogin: true,
      userName: userInfo.userName
    }
  }
  return data
}

router.get('/login', async (ctx) => {
  await ctx.render('login', await getUserInfo(ctx))
})

router.get('/register', async (ctx) => {
  await ctx.render('register', {})
})

module.exports = router
