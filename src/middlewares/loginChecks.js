/**
 * 登陆验证的中间件
 */

const { ErrorModel } = require('../model/resModel')
const { noLogin } = require('../model/ErrorInfo')

/**
 * API 登陆验证
 * @param {*} ctx
 * @param {*} next
 * @returns
 */
async function loginCheck(ctx, next) {
  // 已经登陆
  if (ctx.session && ctx.session.userInfo) {
    await next()
    return
  }

  ctx.body = new ErrorModel(noLogin)
}

/**
 * 未登陆跳转到登录页
 * @param {*} ctx
 * @param {*} next
 * @returns
 */
async function loginRedirect(ctx, next) {
  if (ctx.session && ctx.session.userInfo) {
    await next()
    return
  }

  const curUrl = ctx.url
  ctx.redirect('/login?url=' + encodeURIComponent(curUrl))
}

module.exports = {
  loginCheck,
  loginRedirect
}
