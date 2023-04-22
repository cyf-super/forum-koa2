/**
 * @description 数据格式化
 */

const { DEFAULT_PICTURE } = require('../conf/constants')

/**
 * 格式化用户头像
 * @param {*} obj
 * @returns
 */
function _formatUserPicture(obj) {
  if (obj.picture === null) {
    obj.picture = DEFAULT_PICTURE
  }
  return obj
}

/**
 * 格式化用户信息
 * @param {*} list
 * @returns
 */

function formatUser(list) {
  if (list === null) {
    return list
  }

  if (list instanceof Array) {
    return list.map(_formatUserPicture)
  }

  return _formatUserPicture(list)
}

module.exports = {
  formatUser
}
