/**
 * @description 用户路由
 */

const router = require('koa-router')()
const { isExist, register, login } = require('../../controller/user')
const { getValidator } = require('../../middlewares/validator')
const userValidate = require('../../validator/user')

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

module.exports = router
