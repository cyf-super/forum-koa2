/**
 * @description json schema 验证中间件
 */

const { jsonSchemaFileInfo } = require('../model/ErrorInfo')
const { ErrorModel } = require('../model/ResModel')

/**
 * 生成json schema 验证中间件
 */
function getValidator(validateFn) {
  async function Validator(ctx, next) {
    const data = ctx.request.body
    const error = validateFn(data)
    if (error) {
      // 验证失败
      ctx.body = new ErrorModel(jsonSchemaFileInfo)
      return
    }
    // 验证成功
    await next()
  }
  // 返回中间件
  return Validator
}

module.exports = {
  getValidator
}
