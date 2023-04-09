const router = require('koa-router')()
const jwt = require('jsonwebtoken')
const util = require('util')

const verify = util.promisify(jwt.verify)

const { SECRET } = require('../conf/constants')

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

router.post('/login', async (ctx, next) => {
  const { username, password } = ctx.request.body
  console.log(username, password)
  let userInfo
  if (username === 'abc' && password === '123456') {
    userInfo = {
      username,
      password
    }
  }

  let token
  if (userInfo) {
    token = jwt.sign(userInfo, SECRET, { expiresIn: '1h' })
  }

  console.log(userInfo, token)

  ctx.body = { token, ...userInfo }
})

router.get('/getUserInfo', async (ctx) => {
  const token = ctx.header.authorization
  try {
    const payload = await verify(token.split(' ')[1], SECRET)
    ctx.body = {
      userInfo: payload
    }
  } catch (e) {
    ctx.body = {
      error: 1,
      msg: 'verify token failed'
    }
  }
})

module.exports = router
