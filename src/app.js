const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const path = require('path')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const koaStatic = require('koa-static')

// const jwtKoa = require('koa-jwt')

const { REDIS_CONF } = require('./conf/db')
const { SESSION_SECRET_KEY } = require('./conf/secretKey')
// const { SECRET } = require('./conf/constants')

const blogViewRouter = require('./routes/view/blog')
const userViewRouter = require('./routes/view/user')
const blogHomeApiRouter = require('./routes/api/blog-home')
const userApiRouter = require('./routes/api/user')
const profileApiRouter = require('./routes/api/blog-profile')
const squareApiRouter = require('./routes/api/blog-square')
const errorRouterView = require('./routes/view/error')
const { isProd } = require('./utils/env')
const utilsApiRouter = require('./routes/api/utils')

let onerrorConf = {}
if (isProd) {
  onerrorConf = {
    redirect: '/error'
  }
}
// error handler
onerror(app, onerrorConf)

// app.use(jwtKoa({
//   secret: SECRET
// }).unless({
//   path: [/^\/users\/login/] // 登陆不需要jwt
// }))

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(koaStatic(path.join(__dirname, 'public')))
app.use(koaStatic(path.join(__dirname, '..', 'uploadFiles')))

app.use(views(path.join(__dirname, '/views'), {
  extension: 'ejs'
}))

app.keys = [SESSION_SECRET_KEY]
app.use(session({
  key: 'weibo.sid', // cookie name,默认是 'koa.sid'
  prefix: 'weibo:sess:', // redis key的前缀，默认：koa:sess:
  cookie: {
    path: '/',
    httpOnly: true, // 客户端无法修改
    maxAge: 24 * 60 * 60 * 1000
  },
  store: redisStore({
    all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
  })
}))

// routes
app.use(blogViewRouter.routes(), blogViewRouter.allowedMethods())
app.use(utilsApiRouter.routes(), utilsApiRouter.allowedMethods())
app.use(userViewRouter.routes(), userViewRouter.allowedMethods())
app.use(userApiRouter.routes(), userApiRouter.allowedMethods())
app.use(blogHomeApiRouter.routes(), blogHomeApiRouter.allowedMethods())
app.use(profileApiRouter.routes(), profileApiRouter.allowedMethods())
app.use(squareApiRouter.routes(), squareApiRouter.allowedMethods())
// 放最底下
app.use(errorRouterView.routes(), errorRouterView.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
