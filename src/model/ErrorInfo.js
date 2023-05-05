/**
 * @description 失败信息集合 包括 error 和 message
 */

module.exports = {
  registerUserNameNotExistInfo: {
    errno: 10003,
    message: '用户名未存在'
  },
  registerUserNameExistInfo: {
    errno: 10001,
    message: '用户名已存在'
  },
  registerFailInfo: {
    code: 10002,
    message: '注册失败，请重试'
  },
  jsonSchemaFileInfo: {
    errno: 10009,
    message: '数据格式校验错误'
  },
  loginFailInfo: {
    code: 10004,
    message: '登录失败，用户名或密码错误'
  },
  noLogin: {
    errno: 10005,
    message: '您尚未登录'
  },
  uploadFilesizeFailInfo: {
    code: 10007,
    message: '上传文件尺寸过大'
  }
}
