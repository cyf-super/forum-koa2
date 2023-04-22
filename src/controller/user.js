/**
 * @description user controller
 */

const { registerUserNameNotExistInfo } = require('../model/ErrorInfo')
const { getUserInfo } = require('../services/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')

/**
 * 用户名是否存在
 */
const isExist = async function (username) {
  const userInfo = await getUserInfo(username)

  if (userInfo) {
    return new SuccessModel(userInfo)
  } else {
    return new ErrorModel(registerUserNameNotExistInfo)
  }
}

module.exports = {
  isExist
}
