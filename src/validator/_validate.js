/**
 * @description json schema 校验
 */

const Ajv = require('ajv')
const ajv = new Ajv()

/**
 * json schema校验
 * @param {object} schema 规则
 * @param {object} data 待校验规则
 */
function validate(schema, data = {}) {
  const alidateAjv = ajv.compile(schema) // 编译校验规则
  const valid = alidateAjv(data)
  if (!valid) {
    return alidateAjv.errors
  }
}

module.exports = validate
