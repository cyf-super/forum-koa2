/**
 * @description user controller
 */

const {
  registerUserNameNotExistInfo,
  registerUserNameExistInfo,
  registerFailInfo,
  loginFailInfo
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

/**
 * 登陆
 * @param {Object} koa2 ctx
 * @param {string} userName
 * @param {string} password
 * @returns
 */
async function login(ctx, userName, password) {
  const userInfo = await getUserInfo(userName, doCrypto(password))
  // 登陆失败
  if (!userInfo) {
    return new ErrorModel(loginFailInfo)
  }

  // 登陆成功
  if (!ctx.session.userInfo) {
    ctx.session.userInfo = userInfo
  }
  return new SuccessModel()
}

module.exports = {
  isExist,
  register,
  login
}
