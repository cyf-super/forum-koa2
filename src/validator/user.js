/**
 * @description 数据格式校验
 */

const validate = require('./_validate')

// 校验规则
const SCHEMA = {
  type: 'object',
  properties: {
    userName: {
      type: 'string',
      pattern: '^[a-zA-Z][a-zA-z0-9_]+$', // 字母开头，字母数字下划
      maxLength: 255,
      minLength: 3
    },
    password: {
      type: 'string',
      maxLength: 255,
      minLength: 2
    },
    newPassword: {
      type: 'string',
      maxLength: 255,
      minLength: 3
    },
    nickName: {
      type: 'string',
      maxLength: 255
    },
    gender: {
      type: 'number',
      minimum: 1,
      maximum: 3
    }
  }
}

function userValidate(data = {}) {
  return validate(SCHEMA, data)
}

module.exports = userValidate
