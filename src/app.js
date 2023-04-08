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

const { REDIS_CONF } = require('./conf/db')

const index = require('./routes/index')
const users = require('./routes/users')
const errorRouterView = require('./routes/view/error')
const { isProd } = require('./utils/env')

let onerrorConf = {}
if (isProd) {
  onerrorConf = {
    redirect: '/error'
  }
}
// error handler
onerror(app, onerrorConf)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(path.join(__dirname, '/public')))

app.use(views(path.join(__dirname, '/views'), {
  extension: 'ejs'
}))

app.keys = ['@CAIyf_123456']
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
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
// 放最底下
app.use(errorRouterView.routes(), errorRouterView.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
