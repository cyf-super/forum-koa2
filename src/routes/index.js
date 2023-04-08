const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!',
    isMe: true,
    blogList: {
      isEmpty: true
    },
    blogData: [
      {
        id: 1,
        msg: 'aa'
      },
      {
        id: 2,
        msg: 'bb'
      },
      {
        id: 3,
        msg: 'cc'
      },
      {
        id: 4,
        msg: 'dd'
      }
    ]
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  const session = ctx.session
  if (session.viewNum === null) {
    session.viewNum = 0
  }
  session.viewNum++
  ctx.body = {
    title: 'koa2 json',
    viewNum: session.viewNum
  }
})

module.exports = router
