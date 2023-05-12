/**
 * @description @关系数据模型
 */
const seq = require('../seq.js')
const { INTEGER, BOOLEAN } = require('../types.js')

const AtRelation = seq.define('atRelation', {
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '用户ID'
  },
  blogId: {
    type: INTEGER,
    allowNull: false,
    comment: '博客Id'
  },
  isRead: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false,
    comment: '是否已读'
  }
})

module.exports = AtRelation
