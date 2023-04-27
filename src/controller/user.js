/**
 * @description user controller
 */

const {
  registerUserNameNotExistInfo,
  registerUserNameExistInfo,
  registerFailInfo
} = require('../model/ErrorInfo')
const { getUserInfo, createUser } = require('../services/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const doCrypto = require('../utils/crypto')

/**
 * 用户名是否存在
 */
const isExist = async function (userName) {
  const userInfo = await getUserInfo(userName)

  if (userInfo) {
    return new SuccessModel(userInfo)
  } else {
    return new ErrorModel(registerUserNameNotExistInfo)
  }
}

/**
 * 注册
 * @param {string} userName
 * @param {string} password
 * @param {number} gender
 * @returns
 */
const register = async function ({ userName, password, gender }) {
  const userInfo = await getUserInfo(userName)
  if (userInfo) {
    // yhumi用户名已经存在
    return new ErrorModel(registerUserNameExistInfo)
  }

  try {
    await createUser({
      username: userName,
      password: doCrypto(password),
      gender
    })
    return new SuccessModel()
  } catch (e) {
    console.log(e.messgae, e.stack)
    return new ErrorModel(registerFailInfo)
  }
}

module.exports = {
  isExist,
  register
}
