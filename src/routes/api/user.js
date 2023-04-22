/**
 * @description 用户路由
 */

const router = require('koa-router')()
const { isExist } = require('../../controller/user')

router.prefix('/api/user')

router.post('/register', async (ctx) => {

})

router.post('/isExist', async (ctx) => {
  const { userName } = ctx.request.body
  ctx.body = await isExist(userName)
})

module.exports = router
