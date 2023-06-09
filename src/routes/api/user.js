/**
 * @description 用户路由
 */

const router = require('koa-router')()
const {
  isExist,
  register,
  login,
  changeInfo,
  changePassword,
  loginOut
} = require('../../controller/user')
const { loginCheck } = require('../../middlewares/loginChecks')
const { getValidator } = require('../../middlewares/validator')
const userValidate = require('../../validator/user')
const { getFollower } = require('../../controller/user-relation')

router.prefix('/api/user')

router.post('/register', getValidator(userValidate), async (ctx) => {
  const { userName, password, gender } = ctx.request.body
  ctx.body = await register({ userName, password, gender })
})

router.post('/login', async (ctx, next) => {
  const { userName, password } = ctx.request.body
  ctx.body = await login(ctx, userName, password)
})

router.post('/isExist', async (ctx) => {
  const { userName } = ctx.request.body
  ctx.body = await isExist(userName)
})

// 修改个人信息
router.patch('/changeInfo', loginCheck, getValidator(userValidate), async (ctx, next) => {
  const { nickName, city, picture } = ctx.request.body
  ctx.body = await changeInfo(ctx, { nickName, city, picture })
})

// 修改密码
router.patch('/changePassword', loginCheck, getValidator(userValidate), async (ctx, next) => {
  const { password, newPassword } = ctx.request.body
  const { userName } = ctx.session.userInfo
  ctx.body = await changePassword(userName, password, newPassword)
})

router.post('/logout', loginCheck, async (ctx, next) => {
  ctx.body = await loginOut(ctx)
})

// 获取@列表，即关注人列表
router.get('/getAtList', loginCheck, async ctx => {
  const { id: userId } = ctx.session.userInfo
  const result = await getFollower(userId)
  const { followersList } = result.data
  const list = followersList.map(user => {
    return `${user.nickName} - ${user.userName}`
  })

  ctx.body = list
})

module.exports = router
